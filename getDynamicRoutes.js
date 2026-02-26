
import data from './src/data/tools'
import { activities } from './src/data/config'
import {sanitizeStringForUrl} from './src/js/utils'
// import lingo from './src/data/lingo.js'
export function getDynamicRoutes() {
    const routes = []
    data.tools.nodes.forEach((tool) => {
       // routes.push('/recovery-tool/' + tool.slug)
       //TODO #48 #47 The slug here is returning undefined
       let route = tool.title
       const lastChar = route.slice(-1);

        if (!/[a-zA-Z0-9]/.test( route.slice(-1))) {
            route = route.slice(0, -1);
        }
        routes.push(route)
        console.log("Adding route: " + '/recovery-tool/' + sanitizeStringForUrl(route))
    })
    activities.forEach((activity) => {
       activity.menu && routes.push('/' + activity.url)
       activity.menu && console.log("Adding route: " + '/' + activity.url)
       //TODO #50 #49 These routes can also have an icon associated with them that gets used ny the OS. Needs a little research on what iOS needs and how to set this up
    })

    return routes
}
export function getShortcuts() {
    const shortcuts = []
    activities.forEach((activity) => {
       activity.shortcuts && shortcuts.push(
        {
            "name": activity.title,
            "url": '/' + activity.url,
        }
        )
        activity.shortcuts && console.log("Adding shortcut: " + activity.title+"  url: " + '/' + activity.url)
    })
    return shortcuts;
}

export default {
  getDynamicRoutes,
  getShortcuts,
}