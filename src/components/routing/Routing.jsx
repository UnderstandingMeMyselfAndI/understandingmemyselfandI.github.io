import { useEffect, useCallback, useRef } from 'react'
import useAppStore from '@/store/useAppStore'
import { activities } from '@/data/config'
import { trackEvent } from '@/js/analytics/analytics'
import data from '@/data/tools'
import {
  getUrlPathSegments,
  isEmpty,
  sanitizeStringForUrl,
  setBrowserHistory,
} from '@/js/utils.js'
import { strings } from '@/data/config'

// TODO: #14 Ga event names need to be changed phrase_viewed - > [name of phrase]_viewed
// TODO: #15 Ga event names need to be changed acronym_viewed - > [name of acronym]_tool_viewed

// --- Performance Optimization & Maintainability ---
// Create lookup maps for activities to allow for O(1) access time instead of O(n) with .find()
const activitiesByUrl = activities.reduce((acc, activity) => {
  acc[activity.url] = activity
  return acc
}, {})

const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})

const acronyms = data.tools.nodes.reduce((acc, acronym) => {
  acc[acronym.id] = acronym
  return acc
}, {})

// --- Best Practices ---
// Using window.origin is often cleaner if the port is standard.
// The original implementation is kept for correctness with custom ports.
const appURL = `${window.location.protocol}//${window.location.host}`

const Routing = () => {
  const setActivity = useAppStore((s) => s.setActivity)
  const acronymID = useAppStore((s) => s.acronymID)
  const gae = useAppStore((s) => s.gae) // Google analytics enabled
  const isFirstPageLoad = useRef(true)
  const activity = useAppStore((s) => s.activity)
  const phrase = useAppStore((s) => s.phrase)
  const setIsModal = useAppStore((s) => s.setIsModal)
  const isModal = useAppStore((s) => s.isModal)

  // useEffect(() => {
  //   console.trace('isModal', isModal)
  // }, [isModal])

  // --- Readability & Maintainability ---
  // Centralized function for logging Google Analytics events.
  // const logGAEvent = useCallback(
  //   (name, params = null) => {
  //     if (!gae) {
  //       console.log('Google analytics not enabled')
  //       return
  //     }

  //     if (typeof window.gtag !== 'function' || isEmpty(name)) {
  //       console.log(
  //         '>>>>> invalid typeof window.gtag  ',
  //         typeof window.gtag,
  //         ' or empty name ',
  //         name,
  //       )

  //       return
  //     }
  //     // console.log('logGAEvent setTimeout ', name, params)
  //     setTimeout(
  //       () => {
  //         //console.groupCollapsed('logGAEvent called')
  //         // console.log('logGAEvent')
  //         // window.gtag('event', name, params)
  //          trackEvent(name, {}, gae)
  //         // console.log('>>>>>>>>>>>>>> log ga event ', name, params)

  //         //console.groupEnd()
  //       },
  //       !isFirstPageLoad.current ? 1000 : 0,
  //     )
  //   },
  //   [gae],
  // )
  const doSetBrowserHistory = (activityObj, title, segments = []) => {
    const urlExtra = segments.length > 0 ? '/' + segments.join('/') : ''
    setBrowserHistory(
      `${appURL}/${activityObj.url.toLowerCase()}${urlExtra}`,
      `${strings.app.appName} - ${title}`,
    )
  }

  //-------------------------------------------------------------
  // Lingo phrase view
  //-------------------------------------------------------------
  useEffect(() => {
    if (typeof phrase !== 'string' || isEmpty(phrase)) return

    // console.groupCollapsed('prep log phrase view ')
    // console.log('phrase changed phrase:', phrase, '| type , ', typeof phrase)

    // console.dir(phrase)
    const urlSafePhrase = sanitizeStringForUrl(phrase)
    const lingoAndPhrasesID = 13
    const activityObj = activitiesById[lingoAndPhrasesID]
    // console.log('phrase', phrase)
    // console.log('v', urlSafePhrase)
    // console.log('activityObj', activityObj)

    // Set the browser history

    doSetBrowserHistory(activityObj, `Lingo and Phrases: ${phrase}`, [
      urlSafePhrase.toLowerCase(),
    ])

    // Log the Anayltics event
    const event_name =
      sanitizeStringForUrl(phrase.toLowerCase()) + '_phrase_viewed'

    trackEvent(event_name, {}, gae)
    // console.groupEnd()
  }, [phrase, gae])
  //-------------------------------------------------------------
  // Activity view and close
  //-------------------------------------------------------------
  useEffect(() => {
    // console.log('activity changed ', activity)
    if (activity === -1) setIsModal(false)
    // ----------------------------------------
    // Get the Activity object.
    // ----------------------------------------
    const activityObj = activitiesById[activity]
    // console.groupCollapsed('log activity view ')
    // console.log('activity', activity)
    // console.log('isFirstPageLoad.current', isFirstPageLoad.current)

    if (
      activity !== -1 &&
      !isFirstPageLoad.current &&
      activityObj?.title &&
      activityObj?.url
    ) {
      // console.log('activitiesById', activitiesById)
      doSetBrowserHistory(activityObj, activityObj.title)

      trackEvent(`${activityObj.url}_viewed`, {}, gae)
    } else if (activity !== -1 && !isFirstPageLoad.current) {
      // console.log( `activityObj is either missing title: ${activityObj?.title} | or url: ${activityObj?.url} |`)
    }
    if (activity === -1 && !isFirstPageLoad.current) {
      // home view
      setBrowserHistory(`${appURL}/`, `${strings.app.appName} - Home`)
      trackEvent('Ummi_home_viewed', {}, gae)
    }
    // console.groupEnd()
    isFirstPageLoad.current = false
  }, [activity, gae])

  // --- Best Practices: useEffect for Side Effects ---
  // This effect handles setting the URL when a tool/acronym is selected.
  useEffect(() => {
    if (acronymID === -1) return
    const acronym = acronyms[acronymID]
    const activityObjTools = activitiesById[1]

    // console.groupCollapsed('log acronym view ')
    // console.log('acronymID  ', acronymID)
    // console.log('activityObjTools  ', activityObjTools)
    if (acronym?.title) {
      setBrowserHistory(
        `${appURL}/${activityObjTools.url.toLowerCase()}/${sanitizeStringForUrl(acronym.title.toLowerCase())}`,
        `${strings.app.appName} Tool - ${acronym.title}`,
      )
      trackEvent(`${acronym.title}_tool_viewed`, {}, gae)
    }
    // console.groupEnd()
  }, [acronymID, gae])

  const logChildRoute = useCallback(
    (segments) => {
      console.groupCollapsed('logChildRoute called')
      const [mainRoute, childRoute] = segments
      if (mainRoute === 'lingo-and-phrases' && childRoute) {
        trackEvent(`${childRoute}_phrase_viewed`, {}, gae)
        console.log('logGAEvent ', `${childRoute}_phrase_viewed`)
      } else if (mainRoute === 'tools' && childRoute) {
        // Assuming childRoute is the tool title/slug

        trackEvent(`${childRoute}_tool_viewed`, {}, gae)
        console.log('logGAEvent ', `${childRoute}_tool_viewed`)
      }
      console.groupEnd()
    },
    [gae],
  )

  // --- Best Practices: useCallback for Memoization ---
  // Memoize handleUrlChange to prevent it from being recreated on every render.
  const handleUrlChange = useCallback(() => {
    // console.log('handleUrlChange')
    const segments = getUrlPathSegments()

    if (segments.length === 0) return

    // --- Performance: O(1) lookup ---
    const activityObj = activitiesByUrl[segments[0]] || null
    if (!activityObj) {
      console.warn(`Routing: No activity found for slug "${segments[0]}"`)
      return
    }

    console.log('segments', segments)

    // console.log('setActivity id:', activityObj?.id)
    setActivity(activityObj.id ?? -1)
    if (!activityObj.modal) {
      // console.log('scroll to ', activityObj?.anchorID)

      requestAnimationFrame(() => {
        const el = document.getElementById(activityObj?.anchorID)
        el && el.scrollIntoView(true)
      })
    }
    if (segments.length > 1) {
      logChildRoute(segments)
    }

    isFirstPageLoad.current = false
  }, [setActivity, logChildRoute])

  // --- Best Practices: Centralized Effect for Event Listeners ---
  // Manages all history/navigation event listeners in one place.
  useEffect(() => {
    // This handles initial page load.
    handleUrlChange()

    // --- Best Practices: Cleanup ---
    // Listen for URL changes via hash and browser back/forward buttons.
    window.addEventListener('hashchange', handleUrlChange)
    window.addEventListener('popstate', handleUrlChange)

    // The cleanup function removes listeners when the component unmounts to prevent memory leaks.
    return () => {
      window.removeEventListener('hashchange', handleUrlChange)
      window.removeEventListener('popstate', handleUrlChange)
    }
    // This effect should only run once when the component mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array ensures this runs only once.

  return null
}

export default Routing
