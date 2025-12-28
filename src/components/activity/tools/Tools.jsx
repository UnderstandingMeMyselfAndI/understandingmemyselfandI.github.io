import { useEffect, useState, useRef } from 'react'
import useAppStore from '@/store/useAppStore'
import { activities } from '@/data/config'
import MenuCarousel from '@/components/ui/menuCarousel/MenuCarousel'
import { useInView, useOnInView } from 'react-intersection-observer'
import parse from 'html-react-parser'
import { strings } from '@/data/config'
import './styles.scss'
import PropTypes from 'prop-types'
const Tools = () => {
	const name = 'tools'

	const setToolsInView = useAppStore((s) => s.setToolsInView)

	const [open, setOpen] = useState(true)
	const activity = useAppStore((s) => s.activity)
	const activityID = activities.find((activity) => (activity.url === name ? activity.id : null))
	const content = strings.activity.find((activity) => activity.name === name) || null
	if (content === null) {
		console.warn(`No content found for activity "${name}"`)
	}

	useEffect(() => {
		setOpen(activityID === activity)
	}, [activity, activityID])

	const inViewRef = useOnInView(
		(inView, entry) => {
			if (inView) {
				// Do something with the element that came into view
				// console.log('Element is in view', entry.target)
				setToolsInView(true)
			} else {
				// console.log('Element left view', entry.target)
				setToolsInView(false)
			}
		},
		{
			/* Optional options */
			threshold: 0,
			rootMargin: '-35% 0% -75% 0%',
		}, // Optional IntersectionObserver options
	)

	return (
		<div ref={inViewRef} className={'activity' + (open ? ' show' : ' ')}>
			<section className='tools' id='tools'>
				<h2>
					<u>{content?.title}</u>
				</h2>

				<MenuCarousel />
			</section>
		</div>
	)
}
Tools.propTypes = {
	handleMenuClick: PropTypes.func,
}
export default Tools
