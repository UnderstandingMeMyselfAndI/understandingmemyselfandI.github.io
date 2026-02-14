const localStore = (() => {
  let last_id = 0
  const _validate = (which, id, value = null) => {
      if (value && typeof value !== 'boolean') {
        console.error("updateStorage 'value' must be boolean")
        return
      }
      if (which && typeof which !== 'string') {
        console.error("updateStorage 'which' must be string")
        return
      }
      if (id && typeof id !== 'number') {
        console.error("updateStorage 'id' must be number")
        return
      }
    },
    _isItem = (which, id) => {
      return localStorage.getItem(`${which}-${id}`)
    },
    _set = (which, id, value) => {
      //if (!_validate(which, id, value)) return;
      localStorage.setItem(`${which}-${id}`, value)
    },
    _remove = (which, id) => {
      //if (!_validate(which, id)) return;
      localStorage.removeItem(`${which}-${id}`)
    },
    _getCountByLabel = (which, ids = []) => {
      let count = 0
      ids.forEach((id, i) => {
        if (localStorage.getItem(`${which}-${id}`) === 'true') {
          count++
        }
      })
      return count
    },
    _getSelectedIDsByLabel = (which, ids = []) => {
      let out = []
      ids.forEach((id, i) => {
        if (localStorage.getItem(`${which}-${id}`) === 'true') {
          out.push(id)
        }
      })

      return out
    },
    _isTrue = (which, id) => {
      return localStorage.getItem(`${which}-${id}`)
        ? localStorage.getItem(`${which}-${id}`) === 'true'
          ? true
          : false
        : false || null
    },
    _get = (which, id) => {
      //	if (!_validate(which, id)) return;
      //if (_isItem(which, id)) {
      return localStorage.getItem(`${which}-${id}`) || null
      //}
      // return null;
    }

  return {
    // -----------------------------------------
    // API
    // -----------------------------------------
    set: _set,
    remove: _remove,
    get: _get,
    isTrue: _isTrue,
    getCountByLabel: _getCountByLabel,
    getSelectedIDsByLabel: _getSelectedIDsByLabel,
  }
})()
const storeKeys = {
  emergency: 'emc',
  favourite: 'fav',
  toolbox: 'tbx',
  tool: 'tl',
}
export { storeKeys, localStore }
