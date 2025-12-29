import { useEffect, useState } from 'react'
import useAppStore from '@/store/useAppStore'
import { activities } from '@/data/config'
import toolsData from '@/data/tools.js'
import PropTypes from 'prop-types'

function setBrowserHistory(slug, title) {
    history.pushState({ page: title }, '', slug)
}
function getAcronymID(slug) {
    return toolsData.tools.nodes.find((tool) => {
        if (tool.slug === slug) {
            return tool.id
        }
    })    
}


const Routing = () => {

    // const activity = useAppStore((s) => s.activity)
    // const acronymID = useAppStore((s) => s.acronymID)
    // const setActivity = useAppStore((s) => s.setActivity)
    // const setAcronymID = useAppStore((s) => s.setAcronymID)
    // const setShowAccCard = useAppStore((s) => s.setShowAccCard)

    // const showTool = (id) => {
    //     if (!id) {
    //         console.log("invalid tool slug id: ", id)
    //         return
    //     }
    //     setAcronymID(id)
	// 	setShowAccCard(true)
	// 	setActivity(1)
    // }
    // useEffect(() => {
    //     const tool = toolsData.tools.nodes.find((tool) => {
           
    //        if(tool.id === acronymID) return tool
    //     })
	// 		 if(tool) setBrowserHistory('/recovery-tool/' + tool?.slug, 'Recovery tool - '+tool?.title)
			
    // }, [acronymID])

    // const loadContentFromSlug = () => {
    //     const path = window.location.pathname
    //     const parts = path.split('/')
    //     let data = null
    //     if (path) {
    //         const activity = parts[1]

    //         switch (activity) {
    //             case 'recovery-tool':
                    
    //                 data = getAcronymID(parts[2])
                   
    //                 showTool(data.id) 
    //                 break;
    //         }
    //     }

    // }
    
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            // loadContentFromSlug();
        })
    } else {
        // loadContentFromSlug()
    }
    
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
