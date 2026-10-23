// One-shot migration from legacy keyval-store/keyval to ummi-db/settings.
// v1: baseline migration.
// v2: move yourToolsEnabled from plaintext config to encrypted app.
// v3: move feature flags into encrypted app.
// v4: remove PINLockEnabled (dead field).
// v5: remove smoothScrollEnabled (dead field).

import { get, set, del } from 'idb-keyval'
import { hasPasscode, isUnlocked, subscribeLockState } from './securityGate'
import { loadApp, loadConfig, loadMeta, saveApp, saveConfig, saveMeta, clearAllSettings } from './settingsStorage'

const LEGACY_KEY = 'ummi'
const LEGACY_RENAMED_KEY = 'ummi-migrated'
const MIGRATION_VERSION = 5

const ENCRYPTED_KEYS = [
  'userToolIDs',
  'yourToolsEnabled',
  'toolboxFilterEnabled',
  'toolsEnabled',
  'wheelHistory',
  'rememberWheels',
  'wheelOfLifeEnabled',
  'daysCounterEnabled',
  'quizEnabled',
  'unitsCalculatorEnabled',
  // smoothScrollEnabled removed — field deleted
]

const PLAINTEXT_KEYS = [
  'theme',
  'textScale',
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

const LEGACY_MAP = {
  ins: 'isInstallable',
  isisn: 'isInstalled',
  dc: 'daysCounterEnabled',
  wol: 'wheelOfLifeEnabled',
  quiz: 'quizEnabled',
  uc: 'unitsCalculatorEnabled',
  // Ss removed — smoothScrollEnabled deleted
  tls: 'toolsEnabled',
  tf: 'toolboxFilterEnabled',
  yt: 'yourToolsEnabled',
  qe: 'quickExitEnabled',
  qem: 'quickExitMessageEnabled',
  c: 'allowCookies',
  tpc: 'allowThirdPartyCookies',
  sqeo: 'showQuickExitOnboarding',
  qeu: 'quickExitURL',
  lvc: 'lastVersionCheck',
}

const DEPRECATED_FIELDS = ['PINLockEnabled', 'smoothScrollEnabled']

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

async function moveEncryptedFieldsFromConfig() {
  const config = await loadConfig()
  if (!config) return false

  const stillInConfig = ENCRYPTED_KEYS.filter((k) => k in config)
  if (stillInConfig.length === 0) return false

  if (hasPasscode() && !isUnlocked()) {
    throw new Error('DEFERRED:locked')
  }

  const app = (await loadApp()) ?? {}
  const migrated = {}
  for (const k of stillInConfig) migrated[k] = config[k]

  await saveApp({ ...app, ...migrated })

  const cleanConfig = { ...config }
  for (const k of stillInConfig) delete cleanConfig[k]
  await saveConfig(cleanConfig)

  return true
}

async function cleanupDeprecatedFields() {
  const config = await loadConfig()
  if (!config) return false

  const present = DEPRECATED_FIELDS.filter((k) => k in config)
  if (present.length === 0) return false

  const cleanConfig = { ...config }
  for (const k of present) delete cleanConfig[k]
  await saveConfig(cleanConfig)
  return true
}

export async function migrateIfNeeded() {
  const meta = await loadMeta()
  const currentVersion = meta?.migrationVersion ?? 0

  if (currentVersion >= MIGRATION_VERSION) {
    return { status: 'skipped' }
  }

  if (currentVersion >= 1) {
    try {
      await moveEncryptedFieldsFromConfig()
      await cleanupDeprecatedFields()
      await saveMeta({ ...meta, migrationVersion: MIGRATION_VERSION })
      return { status: 'complete' }
    } catch (err) {
      if (String(err?.message) === 'DEFERRED:locked') {
        return { status: 'config-only' }
      }
      throw err
    }
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
