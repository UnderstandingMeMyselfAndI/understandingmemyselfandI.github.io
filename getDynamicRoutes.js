
import data from './src/data/tools'
import { activities } from './src/data/config'
// import lingo from './src/data/lingo.js'
export function getDynamicRoutes() {
    const routes = []
    data.tools.nodes.forEach((tool) => {
       // routes.push('/recovery-tool/' + tool.slug)
        console.log("Adding route: " + '/recovery-tool/' + tool.slug)
    })
    activities.forEach((activity) => {
       activity.menu && routes.push('/' + activity.url)
       activity.menu && console.log("Adding route: " + '/' + activity.url)
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