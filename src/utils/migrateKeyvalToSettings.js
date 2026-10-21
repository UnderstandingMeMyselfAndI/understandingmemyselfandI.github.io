// One-shot migration from legacy keyval-store/keyval to ummi-db/settings.
// The legacy data was a Zustand persist blob under the key 'ummi'.
// Preserved as 'ummi-migrated' so it can be inspected or restored during testing.

import { get, set, del } from 'idb-keyval'
import { hasPasscode, isUnlocked, subscribeLockState } from './securityGate'
import { loadApp, loadConfig, loadMeta, saveApp, saveConfig, saveMeta } from './settingsStorage'
import { clearAllSettings } from './settingsStorage'

const LEGACY_KEY = 'ummi'
const LEGACY_RENAMED_KEY = 'ummi-migrated'
const MIGRATION_VERSION = 1

// Sensitive fields → ummi-db/settings/app (encrypted).
const ENCRYPTED_KEYS = ['userToolIDs', 'wheelHistory', 'rememberWheels']

// Plaintext fields → ummi-db/settings/config.
// Includes only the canonical name where the old schema had a duplicate.
const PLAINTEXT_KEYS = [
  'theme',
  'textScale',
  'daysCounterEnabled',
  'wheelOfLifeEnabled',
  'quizEnabled',
  'unitsCalculatorEnabled',
  'toolsEnabled',
  'smoothScrollEnabled',
  'toolboxFilterEnabled',
  'yourToolsEnabled',
  'PINLockEnabled',
  'quickExitEnabled',
  'quickExitMessageEnabled',
  'allowCookies',
  'allowThirdPartyCookies',
  'showQuickExitOnboarding',
  'quickExitURL',
  'exitButtonPosition',
  'showBurgerStack',
  'version',
  'lastVersionCheck',
  'nss',
  'isInstallable',
  'isInstalled',
  'vc',
  'lvd',
  'fvd',
  'spv',
  'gae',
  'currency',
  'ageVerified',
]

// Legacy shorthand → canonical name. Used to read from old blobs that still
// carry the shorthand keys.
const LEGACY_MAP = {
  ins: 'isInstallable',
  isisn: 'isInstalled',
  dc: 'daysCounterEnabled',
  wol: 'wheelOfLifeEnabled',
  quiz: 'quizEnabled',
  uc: 'unitsCalculatorEnabled',
  Ss: 'smoothScrollEnabled',
  tls: 'toolsEnabled',
  tf: 'toolboxFilterEnabled',
  yt: 'yourToolsEnabled',
  pl: 'PINLockEnabled',
  qe: 'quickExitEnabled',
  qem: 'quickExitMessageEnabled',
  c: 'allowCookies',
  tpc: 'allowThirdPartyCookies',
  sqeo: 'showQuickExitOnboarding',
  qeu: 'quickExitURL',
  lvc: 'lastVersionCheck',
}

function pick(state, keys) {
  const out = {}
  for (const k of keys) {
    const canonical = LEGACY_MAP[k] ?? k
    if (state[canonical] !== undefined) out[k] = state[canonical]
    else if (state[k] !== undefined) out[k] = state[k]
  }
  return out
}

async function readLegacy() {
  const raw = (await get(LEGACY_KEY)) ?? (await get(LEGACY_RENAMED_KEY))
  if (!raw) return null
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
    return parsed?.state ?? null
  } catch {
    return null
  }
}

async function renameLegacy() {
  const raw = await get(LEGACY_KEY)
  if (!raw) return
  await set(LEGACY_RENAMED_KEY, raw)
  await del(LEGACY_KEY)
}

/**
 * Run migration if needed. Safe to call repeatedly.
 * @returns {Promise<{status: 'skipped'|'no-legacy'|'config-only'|'complete'}>}
 */
export async function migrateIfNeeded() {
  const meta = await loadMeta()
  if ((meta?.migrationVersion ?? 0) >= MIGRATION_VERSION) {
    return { status: 'skipped' }
  }

  const legacyState = await readLegacy()
  if (!legacyState) {
    await saveMeta({ ...meta, migrationVersion: MIGRATION_VERSION })
    return { status: 'no-legacy' }
  }

  if (!(await loadConfig())) {
    await saveConfig(pick(legacyState, PLAINTEXT_KEYS))
  }

  if (await loadApp()) {
    await renameLegacy()
    await saveMeta({ ...meta, migrationVersion: MIGRATION_VERSION })
    return { status: 'complete' }
  }

  const canEncrypt = !hasPasscode() || isUnlocked()
  if (!canEncrypt) {
    return { status: 'config-only' }
  }

  await saveApp(pick(legacyState, ENCRYPTED_KEYS))
  await renameLegacy()
  await saveMeta({ ...meta, migrationVersion: MIGRATION_VERSION })
  return { status: 'complete' }
}

/**
 * Subscribe to unlock and retry migration. Call once at boot.
 * No-op after migration completes.
 */
let unsubscribe = null
export function watchForUnlockAndMigrate() {
  if (unsubscribe) return unsubscribe
  unsubscribe = subscribeLockState(({ unlocked }) => {
    if (!unlocked) return
    migrateIfNeeded().catch((err) => {
      console.error('[settings-migration] retry failed:', err)
    })
  })
  return unsubscribe
}

/**
 * DEV ONLY — restore the legacy blob and clear the new settings store so
 * migration can be re-run from scratch. Attached to window in dev.
 */
export async function resetMigrationForTesting() {
  const migrated = await get(LEGACY_RENAMED_KEY)
  if (migrated) {
    await set(LEGACY_KEY, migrated)
    await del(LEGACY_RENAMED_KEY)
  }
  await clearAllSettings()
  console.log('[settings-migration] reset. Reload to re-run migration.')
}

if (import.meta.env?.DEV && typeof window !== 'undefined') {
  window.__resetMigration = resetMigrationForTesting
}
