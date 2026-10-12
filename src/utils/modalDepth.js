// src/utils/modalDepth.js
// Global count of open modals. Anything that renders a dialog should register
// here so feature code can avoid firing notifications behind an open modal.

import { useEffect } from 'react'

let depth = 0
const subs = new Set()

function emit() {
  subs.forEach((fn) => {
    try {
      fn(depth)
    } catch {
      /* ignore */
    }
  })
}

export function pushModal() {
  depth += 1
  emit()
}
export function popModal() {
  depth = Math.max(0, depth - 1)
  emit()
}
export function getModalDepth() {
  return depth
}
export function isModalOpen() {
  return depth > 0
}

export function subscribeModal(fn) {
  subs.add(fn)
  fn(depth)
  return () => subs.delete(fn)
}

/**
 * Register the component that calls this hook as an open modal for the
 * duration of its mount. Render the modal conditionally and this runs
 * exactly when the dialog is on screen.
 */
export function useRegisterModal(active = true) {
  useEffect(() => {
    if (!active) return undefined
    pushModal()
    return () => popModal()
  }, [active])
}
