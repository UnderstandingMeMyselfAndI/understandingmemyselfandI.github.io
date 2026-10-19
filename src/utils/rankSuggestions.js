// src/utils/rankSuggestions.js
// Pure ranking logic for the "Who with" type-ahead.
// Lives here (not in the component file) so Fast Refresh keeps working.

import { LIMITS } from '@data/smallWinsData.js'
import { normaliseName, nameKey } from './smallWinsStorage.js'

export function rankSuggestions(suggestions, query, selected) {
  const selectedKeys = new Set((selected || []).map(nameKey))
  const q = normaliseName(query).toLowerCase()

  return suggestions
    .filter((name) => !selectedKeys.has(nameKey(name)))
    .map((name) => {
      const lower = name.toLowerCase()
      let rank = 2
      if (q && lower.startsWith(q)) rank = 0
      else if (q && lower.includes(q)) rank = 1
      return { name, rank }
    })
    .filter((item) => !q || item.rank < 2)
    .sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name))
    .slice(0, LIMITS.suggestionLimit)
    .map((item) => item.name)
}
