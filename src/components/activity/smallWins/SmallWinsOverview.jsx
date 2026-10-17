// src/components/activity/smallWins/SmallWinsOverview.jsx

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { filterEntries, sortEntries, useSmallWinsStore } from '@store/smallWinsStore'
import { EXAMPLE_WINS, STRINGS, WHY_SMALL_WINS } from '@data/smallWinsData.js'
import { formatBytes, storageAdvice } from '@utils/storageQuota.js'
import { useStorageQuota } from '@utils/useStorageQuota.js'
import { formatSmallWinDate } from '@utils/formatSmallWinDate.js'
import SmallWinCard from './components/SmallWinCard'
import parse from 'html-react-parser'
import PasscodeButton from '../../security/PasscodeButton'
import './smallWinsOverview.scss'

const PAGE_SIZE = 40

function EmptyState({ onRecord }) {
  return (
    <div className='small-wins-empty'>
      <h3 className='small-wins-empty__title'>{parse(STRINGS.emptyStateTitle)}</h3>
      <p className='small-wins-empty__body'>{parse(STRINGS.emptyState)}</p>

      <p className='small-wins-empty__examples-label'>{parse(STRINGS.emptyStateExamples)}</p>
      <ul className='small-wins-empty__examples'>
        {EXAMPLE_WINS.slice(0, 4).map((example) => (
          <li key={example} className='small-wins-empty__example'>
            {parse(example)}
          </li>
        ))}
      </ul>

      <button type='button' className='small-wins__button' onClick={onRecord}>
        {STRINGS.createNew}
      </button>
    </div>
  )
}

function WhyMatters() {
  return (
    <div className='small-wins-why'>
      <h3 className='small-wins-why__title'>{parse(STRINGS.whyMattersTitle)}</h3>
      <ul className='small-wins-why__list'>
        {WHY_SMALL_WINS.map((section) => (
          <li key={section.heading} className='small-wins-why__item'>
            <h4 className='small-wins-why__heading'>{parse(section.heading)}</h4>
            <div className='small-wins-why__body'>{parse(section.body)}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PageNumbers({ page, totalPages, onChange, size = 6 }) {
  const pages = useMemo(() => {
    if (totalPages <= size) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    // Sliding window of `size` consecutive pages that includes the current
    // page. `half` biases the window so the current page sits 2nd-from-left
    // in the middle pages, shifting forward near the end.
    const half = Math.floor((size - 1) / 2)
    let start = page - half
    let end = start + size - 1
    if (start < 1) {
      start = 1
      end = size
    }
    if (end > totalPages) {
      end = totalPages
      start = end - size + 1
    }
    const result = []
    for (let p = start; p <= end; p += 1) result.push(p)
    return result
  }, [page, totalPages, size])

  return (
    <ul className='small-wins-overview__pages'>
      {pages.map((p) => (
        <li key={p}>
          <button
            type='button'
            className={`small-wins-overview__page${p === page ? ' is-active' : ''}`}
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            aria-label={`Page ${p}`}>
            {p}
          </button>
        </li>
      ))}
    </ul>
  )
}

function SearchWins({ query, hasQuery, setQuery }) {
  return (
    <div className='small-wins-overview__search'>
      <label className='small-wins-overview__search-label' htmlFor='small-wins-search'>
        {STRINGS.searchLabel}
      </label>
      <div className='small-wins-overview__search-row'>
        <input
          id='small-wins-search'
          type='search'
          className='small-wins-overview__search-input'
          placeholder={STRINGS.searchPlaceholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {hasQuery && (
          <button type='button' className='small-wins-overview__search-clear' onClick={() => setQuery('')}>
            {STRINGS.clearSearch}
          </button>
        )}
      </div>
    </div>
  )
}

export default function SmallWinsOverview() {
  const entries = useSmallWinsStore((s) => s.entries)
  const query = useSmallWinsStore((s) => s.query)
  const setQuery = useSmallWinsStore((s) => s.setQuery)
  const tab = useSmallWinsStore((s) => s.tab)
  const setTab = useSmallWinsStore((s) => s.setTab)
  const openCreate = useSmallWinsStore((s) => s.openCreate)
  const openEntry = useSmallWinsStore((s) => s.openEntry)
  const busy = useSmallWinsStore((s) => s.busy)

  const storage = useStorageQuota()

  const listRef = useRef(null)
  const [page, setPage] = useState(1)
  const [stickyDate, setStickyDate] = useState(null)

  const visible = useMemo(() => sortEntries(filterEntries(entries, query)), [entries, query])
  const hasQuery = query.trim().length > 0
  const isLow = storage && (storage.level === 'low' || storage.level === 'critical')

  // Reset to the first page whenever the search query changes.
  useEffect(() => {
    setPage(1)
  }, [query])

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * PAGE_SIZE

  // Memoised so the layout effect that reads the DOM does not re-run on every
  // parent render — only when the actual page content changes.
  const pageItems = useMemo(() => visible.slice(start, start + PAGE_SIZE), [visible, start])

  const groups = useMemo(() => {
    const result = []
    let current = null
    for (const entry of pageItems) {
      if (!current || current.date !== entry.date) {
        current = { date: entry.date, entries: [] }
        result.push(current)
      }
      current.entries.push(entry)
    }
    return result
  }, [pageItems])

  // Total count of visible wins per date. Drives the pill's "N wins" badge.
  // Recomputed only when the filtered set changes, so search updates it too.
  const winsByDate = useMemo(() => {
    const map = new Map()
    for (const entry of visible) {
      map.set(entry.date, (map.get(entry.date) || 0) + 1)
    }
    return map
  }, [visible])

  // Reset the list's own scroll position when the page changes.
  const prevPageRef = useRef(safePage)
  useEffect(() => {
    if (prevPageRef.current !== safePage) {
      prevPageRef.current = safePage
      if (listRef.current) listRef.current.scrollTop = 0
    }
  }, [safePage])

  // Track which date is currently at the top of the visible list area.
  // useLayoutEffect so the initial measurement happens before the browser
  // paints — this avoids a frame where the sticky date is empty.
  useLayoutEffect(() => {
    if (tab !== 'wins') {
      setStickyDate(null)
      return undefined
    }
    const el = listRef.current
    if (!el) return undefined

    const update = () => {
      const dividers = el.querySelectorAll('[data-date-divider]')
      if (dividers.length === 0) {
        setStickyDate(null)
        return
      }
      const listTop = el.getBoundingClientRect().top
      // The last divider whose top edge is at or above the visible top is the
      // section the user is currently reading.
      let current = dividers[0].getAttribute('data-date')
      for (const divider of dividers) {
        const top = divider.getBoundingClientRect().top - listTop
        if (top <= 1) current = divider.getAttribute('data-date')
        else break
      }
      setStickyDate(current)
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    return () => el.removeEventListener('scroll', update)
  }, [tab, pageItems])

  const changePage = (next) => {
    const clamped = Math.min(Math.max(1, next), totalPages)
    if (clamped !== safePage) setPage(clamped)
  }

  const showPagination = tab === 'wins' && visible.length > PAGE_SIZE
  const showingStart = visible.length === 0 ? 0 : start + 1
  const showingEnd = Math.min(start + PAGE_SIZE, visible.length)
  const showStickyDate = tab === 'wins' && stickyDate && entries.length > 0

  return (
    <div className='small-wins-overview'>
      <header className='small-wins-overview__header'>
        <h1 className='small-wins-overview__title' id='small-wins-heading'>
          {STRINGS.overviewTitle}
        </h1>
        {entries.length > 0 && (
          <span className='small-wins-overview__count'>
            {entries.length === 1 ? '1 win' : `${entries.length} wins`}
          </span>
        )}
      </header>

      <div className='small-wins-overview__tabs' role='tablist' aria-label={STRINGS.overviewTitle}>
        {console.log('query ', query)}
        {!query && (
          <>
            <button
              type='button'
              role='tab'
              aria-selected={tab === 'wins'}
              className={`small-wins-overview__tab${tab === 'wins' ? ' is-active' : ''}`}
              onClick={() => setTab('wins')}>
              {STRINGS.tabWins}
            </button>
            <button
              type='button'
              role='tab'
              aria-selected={tab === 'why'}
              className={`small-wins-overview__tab${tab === 'why' ? ' is-active' : ''}`}
              onClick={() => setTab('why')}>
              {STRINGS.tabWhy}
            </button>{' '}
            <PasscodeButton />
          </>
        )}
        {entries.length > 0 && <SearchWins query={query} hasQuery={hasQuery} setQuery={setQuery} />}
      </div>

      {isLow && (
        <div className={`small-wins-overview__banner small-wins-overview__banner--${storage.level}`} role='status'>
          <strong className='small-wins-overview__banner-title'>{STRINGS.lowStorageTitle}</strong>
          <span className='small-wins-overview__banner-body'>{storageAdvice(storage.level)}</span>
          {storage.quota > 0 && (
            <span className='small-wins-overview__banner-meta'>
              {formatBytes(storage.usage)} of {formatBytes(storage.quota)} used
            </span>
          )}
        </div>
      )}

      {tab === 'why' ? (
        <WhyMatters />
      ) : (
        <>
          {/* {entries.length > 0 && <SearchWins query={query} hasQuery={hasQuery} setQuery={setQuery} />} */}

          {showStickyDate && (
            <div className='small-wins-overview__current-date' aria-live='polite'>
              <span className='small-wins-overview__current-date-label'>Viewing</span>
              <span className='small-wins-overview__current-date-value'>{formatSmallWinDate(stickyDate)}</span>
              <span className='small-wins-overview__current-date-count'>
                {(winsByDate.get(stickyDate) || 0) === 1 ? '1 win' : `${winsByDate.get(stickyDate) || 0} wins`}
              </span>
            </div>
          )}

          {entries.length === 0 ? (
            <EmptyState onRecord={openCreate} />
          ) : visible.length === 0 ? (
            <p className='small-wins-overview__no-results'>{STRINGS.noResults}</p>
          ) : (
            <ul className='small-wins-overview__list' ref={listRef}>
              {groups.map((group) => (
                <li key={group.date} className='small-wins-overview__date-group'>
                  <div className='small-wins-overview__date-divider' data-date-divider='true' data-date={group.date}>
                    {formatSmallWinDate(group.date)}
                  </div>
                  <ul className='small-wins-overview__group-list'>
                    {group.entries.map((entry) => (
                      <SmallWinCard key={entry.id} entry={entry} onOpen={openEntry} />
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}

          {showPagination && (
            <nav className='small-wins-overview__pagination' aria-label='Pagination'>
              <button
                type='button'
                className='small-wins-overview__page-btn'
                onClick={() => changePage(safePage - 1)}
                disabled={safePage <= 1}>
                Previous
              </button>
              <PageNumbers page={safePage} totalPages={totalPages} onChange={changePage} />
              <button
                type='button'
                className='small-wins-overview__page-btn'
                onClick={() => changePage(safePage + 1)}
                disabled={safePage >= totalPages}>
                Next
              </button>
            </nav>
          )}

          {showPagination && (
            <p className='small-wins-overview__page-info'>
              Showing {showingStart}–{showingEnd} of {visible.length}
            </p>
          )}

          {entries.length > 0 && (
            <button type='button' className='small-wins-overview__fab' onClick={openCreate} disabled={busy}>
              {STRINGS.createNew}
            </button>
          )}
        </>
      )}
    </div>
  )
}
