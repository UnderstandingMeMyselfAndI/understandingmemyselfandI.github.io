// src/components/activity/smallWins/SmallWinsOverview.jsx

import { useMemo } from 'react'
import { filterEntries, sortEntries, useSmallWinsStore } from '@store/smallWinsStore'
import { EXAMPLE_WINS, STRINGS, WHY_SMALL_WINS } from '@data/smallWinsData.js'
import { formatBytes, storageAdvice } from '@utils/storageQuota.js'
import { useStorageQuota } from '@utils/useStorageQuota.js'
import SmallWinCard from './components/SmallWinCard'
import parse from 'html-react-parser'
import PasscodeButton from '../../security/PasscodeButton'
import './smallWinsOverview.scss'

function EmptyState({ onRecord }) {
  return (
    <div className='small-wins-empty'>
      <h3 className='small-wins-empty__title'>{STRINGS.emptyStateTitle}</h3>
      <p className='small-wins-empty__body'>{STRINGS.emptyState}</p>

      <p className='small-wins-empty__examples-label'>{STRINGS.emptyStateExamples}</p>
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
      <h3 className='small-wins-why__title'>{STRINGS.whyMattersTitle}</h3>
      <ul className='small-wins-why__list'>
        {WHY_SMALL_WINS.map((section) => (
          <li key={section.heading} className='small-wins-why__item'>
            <h4 className='small-wins-why__heading'>{section.heading}</h4>
            <div className='small-wins-why__body'>{parse(section.body)}</div>
          </li>
        ))}
      </ul>
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

  const visible = useMemo(() => sortEntries(filterEntries(entries, query)), [entries, query])
  const hasQuery = query.trim().length > 0
  const isLow = storage && (storage.level === 'low' || storage.level === 'critical')

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
          {entries.length > 0 && (
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
          )}

          {entries.length === 0 ? (
            <EmptyState onRecord={openCreate} />
          ) : visible.length === 0 ? (
            <p className='small-wins-overview__no-results'>{STRINGS.noResults}</p>
          ) : (
            <ul className='small-wins-overview__list'>
              {visible.map((entry) => (
                <SmallWinCard key={entry.id} entry={entry} onOpen={openEntry} />
              ))}
            </ul>
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
