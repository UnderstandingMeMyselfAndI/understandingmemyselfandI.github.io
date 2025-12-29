import { useEffect, useState } from 'react'
import useAppStore from '@/store/useAppStore'
import { activities } from '@/data/config'
import toolsData from '@/data/tools.js'
import PropTypes from 'prop-types'

function setBrowserHistory(slug, title) {
    history.pushState({ page: title }, '', slug)
}



const Routing = () => {

    const activity = useAppStore((s) => s.activity)
    const acronymID = useAppStore((s) => s.acronymID)

    useEffect(() => {
        const tool = toolsData.tools.nodes.find((tool) => {
           
           if(tool.id === acronymID) return tool
        })
			setBrowserHistory('/recovery-tool/' + tool?.slug, 'Recovery tool - '+tool?.title)
			console.log('routing ', tool?.slug, tool?.title)
		}, [ acronymID])
    
    //TODO: Do this for Activiites
	// useEffect(() => {
    //     const slug = activities.find((activity) => activity.id === activityID).url
    //     const title = activities.find((activity) => activity.id === activityID).title
    //     setBrowserHistory(slug, title)
	// }, [activity, activityID])

	// const handleClose = () => setOpen(false);

	return null
}
Routing.propTypes = {}

export default Routing
