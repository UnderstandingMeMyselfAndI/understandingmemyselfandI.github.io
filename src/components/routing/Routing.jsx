import { useEffect, useState } from 'react'
import useAppStore from '@/store/useAppStore'
import { activities } from '@/data/config'
import toolsData from '@/data/tools.js'
import { sanitizeStringForUrl } from '@/js/utils.js'
import PropTypes from 'prop-types'

const appURL = window.location.protocol + '//' + window.location.hostname + (location.port  ? ':' +location.port : '')  //'https://ummi.now/'


function setBrowserHistory(slug, title) {
    if (slug) history.pushState({ page: title }, '', slug)
}
function getAcronymID(slug) {
    return toolsData.tools.nodes.find((tool) => {
        if (tool.slug === slug) {
            return tool.id
        }
    })    
}


const Routing = () => {
	const activity = useAppStore((s) => s.activity)
	const acronymID = useAppStore((s) => s.acronymID)
	const setActivity = useAppStore((s) => s.setActivity)
	const setAcronymID = useAppStore((s) => s.setAcronymID)
	const setShowAccCard = useAppStore((s) => s.setShowAccCard)
	const phrase = useAppStore((s) => s.phrase)

	const showTool = (id) => {
		if (!id) {
			console.log('invalid tool slug id: ', id)
			return
		}
		setAcronymID(id)
		setShowAccCard(true)
		setActivity(1)
	}
	useEffect(() => {
		setTimeout(() => {
			phrase[0] && phrase[1] && setBrowserHistory(appURL + '/phrase/' + sanitizeStringForUrl(phrase[1]) + '/' + phrase[0], 'Ummi Phrase - ' + phrase[1])
		}, 100)
	}, [phrase])

	useEffect(() => {
		const tool = toolsData.tools.nodes.find((tool) => {
			if (tool.id === acronymID) return tool
		})

		if (tool) {
			setTimeout(() => {
				setBrowserHistory(appURL + '/recovery-tool/' + tool?.slug, 'Recovery tool - ' + tool?.title)
			}, 100)
		}
		// if (!tool) {
		//     console.log('tool base: ', tool)
		//     setBrowserHistory(appURL, 'Ummi')
		// }
	}, [acronymID])

	useEffect(() => {
		const activityObj = activities.find((a) => (parseInt(a.id) === parseInt(activity) ? activity : null))

		if (activityObj) setBrowserHistory(appURL + '/' + activityObj?.url, 'Ummi - ' + activityObj?.title)
		if (activity === -1) {
			setBrowserHistory(appURL, 'Ummi')
		}
	}, [activity])

	const loadContentFromSlug = () => {
		const path = window.location.pathname
		const parts = path.split('/')
		let data = null
		if (path) {
			const activity = parts[1]

			switch (activity) {
				case 'recovery-tool':
					data = getAcronymID(parts[2])

					showTool(data.id)
					break
			}
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => {
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
