
import data from './src/data/tools'
export default function getDynamicRoutes() {
    const routes = [];
    data.tools.nodes.forEach((tool) => {
        routes.push('/recovery-tool/' + tool.slug)
    })
    return routes
}
