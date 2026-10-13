// src/utils/debounce.js
// Small debounce helper with cancel/flush, used by the auto-save pipeline.

export function debounce(fn, wait = 400) {
  let timer = null
  let lastArgs = null

  const invoke = () => {
    const args = lastArgs
    lastArgs = null
    timer = null
    if (args) fn(...args)
  }

  const wrapped = (...args) => {
    lastArgs = args
    if (timer) clearTimeout(timer)
    timer = setTimeout(invoke, wait)
  }

  wrapped.cancel = () => {
    if (timer) clearTimeout(timer)
    timer = null
    lastArgs = null
  }

  wrapped.flush = () => {
    if (!timer) return
    clearTimeout(timer)
    invoke()
  }

  wrapped.pending = () => timer !== null

  return wrapped
}

export default debounce
