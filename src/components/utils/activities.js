import { cnf } from 'data/config'
;(function () {
  const _childList = true,
    _attributes = false,
    _subtree = true,
    _nodes = {
      activityContainer: document.querySelector(cnf.sel.activityContainer),
    },
    _cl = {
      dormant: cnf.classes.activity.dormant,
    },
    _listeners = new Set(),
    _addNodes = (nodes) => {
      for (const node of nodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue
        if (_listeners.has(node)) continue
        _listeners.add(node)
        _addListener(node)
      }
    },
    _addListener = (node) => {
      node.ontransitionend = (e) => {
        if (e.target !== e.currentTarget) return // only act on the parent
        // console.log("transitionend", e);
        if (!e.currentTarget.classList.contains(_cl.dormant)) {
          e.currentTarget.classList.add(_cl.dormant)
        }
      }
    },
    _removed = (nodes) => {
      for (const node of nodes) {
        if (_listeners.has(node)) {
          _clear(node)
        }
      }
    },
    _clear = (node) => {
      node.ontransitionend = null
      _listeners.delete(node)
    },
    _observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          console.log('mutation ', mutation)
          _addNodes(mutation.addedNodes)
          _removed(mutation.removedNodes)
        }
      }
    }),
    _init = () => {
      // if (!_nodes.activityContainer) return;
      _observer.observe(_nodes.activityContainer, {
        childList: _childList,
        attributes: _attributes,
        subtree: _subtree,
      })
    }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _init)
  } else {
    _init()
  }
})()
