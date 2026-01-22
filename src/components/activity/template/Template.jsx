import {useEffect, useState} from "react";
import useAppStore from "@/store/useAppStore";
import { activities } from '@/data/config'
import { strings } from '@/data/config'
import PropTypes from 'prop-types'
import "./styles.scss";


const Template = () => {
	const name = 'name-to-go-here'
	const [open, setOpen] = useState(false)
	const activity = useAppStore((s) => s.activity)
	const activityID = activities.find((activity) => (activity.url === name ? activity.id : null))

	useEffect(() => {
		setOpen(activityID === activity)
	}, [activity, activityID])

	// const handleClose = () => setOpen(false);

	return (
		<div id={name} className={'activity ' + 'activity-' + name + (open ? ' show' : ' hide')}>
			<section className={name}></section>
		</div>
	)
};
Template.propTypes = {}

export default Template;
