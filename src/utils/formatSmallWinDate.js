// src/utils/formatSmallWinDate.js
// Consistent, local-timezone-safe date formatting for Small Wins.
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function toIsoDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function todayIso() {
  return toIsoDate(new Date())
}

export function fromIsoDate(iso) {
  const parts = String(iso || '')
    .split('-')
    .map(Number)
  const [y, m, d] = parts
  if (!y || !m || !d) return null
  const date = new Date(y, m - 1, d)
  return Number.isNaN(date.getTime()) ? null : date
}

export function isFutureIso(iso) {
  return String(iso) > todayIso()
}

export function formatSmallWinDate(iso, now = new Date(), useShortMonths = false) {
  const date = fromIsoDate(iso)
  if (!date) return ''

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diffDays = Math.round((today.getTime() - date.getTime()) / 86400000)
  const month = useShortMonths ? MONTHS_SHORT[date.getMonth()] : MONTHS[date.getMonth()]

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays > 1 && diffDays < 7) return DAYS_SHORT[date.getDay()]
  if (date.getFullYear() === now.getFullYear()) {
    return `${date.getDate()} ${month}`
  }
  return `${date.getDate()} ${month} ${date.getFullYear()}`
}

export function formatSmallWinTimestamp(ms) {
  if (!ms) return ''
  const d = new Date(ms)
  if (Number.isNaN(d.getTime())) return ''
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}, ${hh}:${mm}`
}
