// src/stores/smallWinsStore.js
// Zustand slice: view mode, entries, people, draft and auto-save status.

import { create } from 'zustand'
import * as storage from '@utils/smallWinsStorage.js'
import { debounce } from '@utils/debounce.js'
import { AUTOSAVE_DEBOUNCE_MS, AUTO_PRUNE_EMPTY_DRAFT, LIMITS } from '@data/dataSmallWins.js'
import { todayIso } from '@utils/formatSmallWinDate'
import { schedulePasscodeReminder, cancelPasscodeReminder } from '@utils/passcodeReminder.js'
function mergeEntry(list, entry) {
  const idx = list.findIndex((e) => e.id === entry.id)
  if (idx === -1) return [entry, ...list]
  const next = list.slice()
  next[idx] = entry
  return next
}

function mergePerson(list, person) {
  const key = storage.nameKey(person.name)
  const idx = list.findIndex((p) => storage.nameKey(p.name) === key)
  if (idx === -1) return [person, ...list]
  const next = list.slice()
  next[idx] = person
  return next
}

export function isDirty(draft, baseline) {
  if (!draft || !baseline) return false
  return (
    draft.title !== baseline.title ||
    draft.description !== baseline.description ||
    draft.date !== baseline.date ||
    (draft.whoWith || []).join('\u0000') !== (baseline.whoWith || []).join('\u0000')
  )
}

function isEmptyDraft(draft) {
  if (!draft) return true
  return !draft.title.trim() && !draft.description.trim() && (draft.whoWith || []).length === 0
}

function byDateDesc(a, b) {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1
  return (b.modifiedAt || 0) - (a.modifiedAt || 0)
}

export function filterEntries(entries, query) {
  const q = query.trim().toLowerCase()
  if (!q) return entries
  return entries.filter((entry) => {
    if (entry.title.toLowerCase().includes(q)) return true
    if (entry.description.toLowerCase().includes(q)) return true
    return (entry.whoWith || []).some((name) => name.toLowerCase().includes(q))
  })
}

export function sortEntries(entries) {
  return entries.slice().sort(byDateDesc)
}

const INITIAL = {
  status: 'idle',
  error: null,
  entries: [],
  people: [],
  view: 'overview',
  tab: 'wins',
  selectedId: null,
  draft: null,
  baseline: null,
  saveStatus: 'idle',
  query: '',
  busy: false,
}

export const useSmallWinsStore = create((set, get) => {
  const flushSave = async () => {
    const { draft } = get()
    if (!draft) return

    set({ saveStatus: 'saving' })
    try {
      const saved = await storage.saveEntry(draft)
      set((state) => ({
        entries: sortEntries(mergeEntry(state.entries, saved)),
        draft: state.draft && state.draft.id === saved.id ? saved : state.draft,
        baseline: state.draft && state.draft.id === saved.id ? saved : state.baseline,
        saveStatus: 'saved',
        error: null,
      }))

      // Nudge the user to set a passcode, once per day, only after a
      // genuinely meaningful write.
      const isMeaningful =
        Boolean(saved.title?.trim()) || Boolean(saved.description?.trim()) || (saved.whoWith?.length || 0) > 0

      if (isMeaningful) schedulePasscodeReminder()
    } catch (err) {
      set({ saveStatus: 'error', error: String(err?.message || err) })
    }
  }

  const scheduleSave = debounce(() => {
    flushSave()
  }, AUTOSAVE_DEBOUNCE_MS)

  return {
    ...INITIAL,

    init: async () => {
      if (get().status === 'loading') return
      set({ status: 'loading', error: null })
      try {
        const [entries, people] = await Promise.all([storage.listEntries(), storage.listPeople()])
        set({ entries, people, status: 'ready' })
      } catch (err) {
        set({ status: 'error', error: String(err?.message || err) })
      }
    },

    refresh: async () => {
      try {
        const [entries, people] = await Promise.all([storage.listEntries(), storage.listPeople()])
        set({ entries, people, status: 'ready', error: null })
      } catch (err) {
        set({ error: String(err?.message || err) })
      }
    },

    reset: () => {
      scheduleSave.cancel()
      set({ ...INITIAL })
    },

    setTab: (tab) => set({ tab }),
    setQuery: (query) => set({ query }),
    setSaveStatus: (saveStatus) => set({ saveStatus }),

    openCreate: async () => {
      set({ busy: true, error: null })
      try {
        const entry = await storage.createEntry({ date: todayIso() })
        set((state) => ({
          entries: sortEntries(mergeEntry(state.entries, entry)),
          selectedId: entry.id,
          draft: entry,
          baseline: entry,
          view: 'editor',
          saveStatus: 'idle',
          busy: false,
        }))
        return entry.id
      } catch (err) {
        set({ busy: false, error: String(err?.message || err) })
        return null
      }
    },

    openEntry: (id) => {
      const entry = get().entries.find((e) => e.id === id)
      if (!entry) return
      set({
        selectedId: id,
        draft: { ...entry },
        baseline: entry,
        view: 'editor',
        saveStatus: 'idle',
      })
    },

    updateDraft: (patch) => {
      const { draft } = get()
      if (!draft) return
      const next = { ...draft, ...patch }
      set((state) => ({
        draft: next,
        entries: sortEntries(mergeEntry(state.entries, next)),
        saveStatus: 'saving',
      }))
      cancelPasscodeReminder()
      scheduleSave()
    },

    addWhoWith: async (rawName) => {
      const { draft } = get()
      if (!draft) return

      const display = storage.normaliseName(rawName)
      if (!display) return

      const key = storage.nameKey(display)
      const already = (draft.whoWith || []).some((n) => storage.nameKey(n) === key)
      if (already) return
      if ((draft.whoWith || []).length >= LIMITS.whoWithMax) return

      get().updateDraft({ whoWith: [...(draft.whoWith || []), display] })

      try {
        const person = await storage.upsertPerson(display)
        if (person) set((state) => ({ people: mergePerson(state.people, person) }))
      } catch {
        /* A failed people write must not lose the entry edit. */
      }
    },

    removeWhoWith: (name) => {
      const { draft } = get()
      if (!draft) return
      const key = storage.nameKey(name)
      get().updateDraft({
        whoWith: (draft.whoWith || []).filter((n) => storage.nameKey(n) !== key),
      })
    },

    deleteEntry: async (id) => {
      scheduleSave.cancel()
      try {
        await storage.deleteEntry(id)
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
          view: 'overview',
          draft: null,
          baseline: null,
          selectedId: null,
          saveStatus: 'idle',
        }))
      } catch (err) {
        set({ error: String(err?.message || err) })
      }
    },

    requestClose: async () => {
      const { draft, baseline } = get()
      if (draft && isDirty(draft, baseline)) return false
      await get().saveAndClose()
      return true
    },

    saveAndClose: async () => {
      scheduleSave.flush()
      if (scheduleSave.pending()) return

      const { draft } = get()
      if (draft) {
        try {
          const saved = await storage.saveEntry(draft)
          set((state) => ({ entries: sortEntries(mergeEntry(state.entries, saved)) }))
        } catch {
          /* keep the in-memory copy */
        }

        if (AUTO_PRUNE_EMPTY_DRAFT && isEmptyDraft(draft)) {
          try {
            await storage.deleteEntry(draft.id)
            set((state) => ({ entries: state.entries.filter((e) => e.id !== draft.id) }))
          } catch {
            /* ignore */
          }
        }
      }

      set({
        view: 'overview',
        draft: null,
        baseline: null,
        selectedId: null,
        saveStatus: 'idle',
      })
    },

    discardAndClose: async () => {
      scheduleSave.cancel()
      const { draft, baseline } = get()

      if (draft && AUTO_PRUNE_EMPTY_DRAFT && isEmptyDraft(draft)) {
        try {
          await storage.deleteEntry(draft.id)
          set((state) => ({ entries: state.entries.filter((e) => e.id !== draft.id) }))
        } catch {
          /* ignore */
        }
      } else if (draft && baseline && draft.id === baseline.id) {
        set((state) => ({ entries: sortEntries(mergeEntry(state.entries, baseline)) }))
      }

      set({
        view: 'overview',
        draft: null,
        baseline: null,
        selectedId: null,
        saveStatus: 'idle',
      })
    },
  }
})

export default useSmallWinsStore
