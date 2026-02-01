import { useEffect, useCallback, useRef } from 'react'
import useAppStore from '@/store/useAppStore'
import { activities } from '@/data/config'
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

  // --- Readability & Maintainability ---
  // Centralized function for logging Google Analytics events.
  const logGAEvent = useCallback(
    (name, params = null) => {
      console.trace('logGAEvent called')
      if (!gae) {
        console.log('Google analytics not enabled')
        return
      }
      if (typeof window.gtag === 'function' && !isEmpty(name)) {
        window.gtag('event', name, params)

        console.log('>>>>>>>>>>>>>>>>>>log ga event ', name, params)
      } else {
        console.warn('gtag not available – event not sent:', name)
      }
    },
    [gae],
  )

  useEffect(() => {
    const activityObj =
      activity === 17 ? activitiesById[1] : activitiesById[activity]
    console.log('activity', activity)
    console.log('isFirstPageLoad.current', isFirstPageLoad.current)

    if (activityObj?.title && activityObj?.url) {
      // console.log('activitiesById', activitiesById)
      console.log('activityObj', activityObj)
      setBrowserHistory(
        `${appURL}/${activityObj.url.toLowerCase()}`,
        `${strings.app.appName} Tool - ${activityObj.title}`,
      )
      logGAEvent(`${activityObj.url}_viewed`)
    } else if (activity !== -1) {
      console.log(
        `activityObj is either missing title: ${activityObj?.title} | or url: ${activityObj?.url} |`,
      )
    }
    if (activity === -1 && !isFirstPageLoad.current) {
      isFirstPageLoad.current = false
      setBrowserHistory(
        `${appURL}`,
        `${strings.app.appName} - ${strings.app.title}`,
      )
      logGAEvent('Ummi_home_viewed')
    }
  }, [activity])

  // --- Best Practices: useEffect for Side Effects ---
  // This effect handles setting the URL when a tool/acronym is selected.
  useEffect(() => {
    const acronym = acronyms[acronymID]
    if (acronym?.title) {
      setBrowserHistory(
        `${appURL}/tools/${sanitizeStringForUrl(acronym.title.toLowerCase())}`,
        `${strings.app.appName} Tool - ${acronym.title}`,
      )

      logGAEvent(`${acronym.title}_tool_viewed`)
    }
  }, [acronymID])

  const logChildRoute = useCallback(
    (segments) => {
      console.log('logChildRoute called')
      const [mainRoute, childRoute] = segments
      if (mainRoute === 'lingo-and-phrases' && childRoute) {
        logGAEvent(`${childRoute}_phrase_viewed`)
      } else if (mainRoute === 'tools' && childRoute) {
        // Assuming childRoute is the tool title/slug
        logGAEvent(`${childRoute}_tool_viewed`)
      }
    },
    [logGAEvent],
  )

  // --- Best Practices: useCallback for Memoization ---
  // Memoize handleUrlChange to prevent it from being recreated on every render.
  const handleUrlChange = useCallback(() => {
    console.log('handleUrlChange')
    const segments = getUrlPathSegments()
    console.log('segments', segments)
    if (segments.length === 0) return

    // --- Performance: O(1) lookup ---
    const activityObj = activitiesByUrl[segments[0]]
    if (!activityObj?.url) {
      console.warn(`Routing: No activity found for slug "${segments[0]}"`)
      return
    }
    console.log('logGAEvent activityObj.url ', activityObj.url)
    logGAEvent(`${activityObj.url}_viewed`)

    if (isFirstPageLoad.current) {
      setActivity(activityObj.id ?? -1)
    } else {
      if (segments.length > 1) {
        logChildRoute(segments)
      }
    }

    isFirstPageLoad.current = false
  }, [logGAEvent, setActivity, logChildRoute])

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
