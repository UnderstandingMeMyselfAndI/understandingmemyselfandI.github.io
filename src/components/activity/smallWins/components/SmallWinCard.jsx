// src/components/activity/smallWins/components/SmallWinCard.jsx

import { STRINGS } from '../../../../data/SmallWinsData'
import { formatSmallWinDate } from '../../../../utils/formatSmallWinDate'
import './smallWinCard.scss'

function preview(text, max = 60) {
  const clean = String(text || '')
    .replace(/\s+/g, ' ')
    .trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, max).trimEnd()}…`
}

export default function SmallWinCard({ entry, onOpen }) {
  const title = entry.title.trim() || STRINGS.untitledWin
  const isUntitled = !entry.title.trim()

  return (
    <li className='small-win-card'>
      <button
        type='button'
        className='small-win-card__button'
        onClick={() => onOpen(entry.id)}
        aria-label={`${title}, ${formatSmallWinDate(entry.date)}`}>
        <span className='small-win-card__date'>{formatSmallWinDate(entry.date)}</span>

        <span className={`small-win-card__title${isUntitled ? ' small-win-card__title--untitled' : ''}`}>{title}</span>

        {entry.description.trim() && <span className='small-win-card__preview'>{preview(entry.description)}</span>}

        {entry.whoWith.length > 0 && (
          <span className='small-win-card__people'>
            {entry.whoWith.map((name) => (
              <span key={name} className='small-win-card__chip'>
                {name}
              </span>
            ))}
          </span>
        )}
      </button>
    </li>
  )
}
