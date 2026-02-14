const updateStorage = (action, which, id, value) => {
  if (typeof value !== 'boolean') {
    console.error("updateStorage 'value' must be boolean")
    return
  }
  if (typeof which !== 'string') {
    console.error("updateStorage 'which' must be string")
    return
  }
  if (typeof id !== 'number') {
    console.error("updateStorage 'id' must be number")
    return
  }
  if (action !== 'set' || action !== 'remove') {
    console.error(
      "updateStorage 'action' must be either 'set' or 'remove' -  '" +
        action +
        "' given",
    )
    return
  }
  //-- see if the item alreadys exists in localstorage
  const storedItem = localStorage.getItem(`${which}-${id}`)
  if (storedItem !== null) {
    if (action == 'remove') {
      localStorage.removeItem(`${which}-${id}`)
      return true
    } else {
      localStorage.setItem(`${which}-${id}`, value)
      return true
    }
  } else {
    if (action == 'set') {
      localStorage.setItem(`${which}-${id}`, value)
    }
  }
}

const localStore = (() => {
  let last_id = 0
  const _validate = (action, which, id, value) => {
      if ((action && action !== 'set') || action !== 'remove') {
        console.error(
          "updateStorage 'action' must be either 'set' or 'remove' -  '" +
            action +
            "' given",
        )
        return
      }

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
      if (!_validate(arguments)) return
      if (_isItem(which, id)) {
        localStorage.setItem(`${which}-${id}`, value)
      }
    },
    _remove = (which, id) => {
      if (!_validate(arguments)) return
      if (_isItem(which, id)) localStorage.removeItem(`${which}-${id}`)
    },
    _get = (which, id) => {
      if (!_validate(arguments)) return
      if (_isItem(which, id)) return localStorage.getItem(`${which}-${id}`)
      return false
    }

  return {
    // -----------------------------------------
    // API
    // -----------------------------------------
    set: _set,
    remove: _remove,
    _get: _get,
  }
})()
const storeKeys = {
  emergency: 'emc',
  favourite: 'fav',
  toolbox: 'tbx',
  tool: 'tl',
}
export default { storeKeys, localStore } || localStore
