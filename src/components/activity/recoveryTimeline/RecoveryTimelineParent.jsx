import {useEffect, useState} from "react";
import useAppStore from "@/store/useAppStore";
import { activities } from '@/data/config'
import RecoveryTimeline from "./RecoveryTimeline";
import { timelineData as originalTimelineData, timelineConfig } from '@/data/recoveryTimeline'
import { transformTimelineData } from "@/data/recoveryTimelineTransformer";
import "./styles.scss";


const RecoveryTimelineParent = () => {
	const name = 'RecoveryTimelineParent'
	const [open, setOpen] = useState(true)
    const [timelineData, setTimelineData] = useState(null);
	const activity = useAppStore((s) => s.activity)
	const activityID = activities.find((activity) => (activity.url === name ? activity.id : null))



    useEffect(() => {
        const transformedData = transformTimelineData(originalTimelineData);
        setTimelineData(transformedData);
    }, []);

	const handleClose = () => {
        setOpen(false);
    };

	return (
		<div id={name} className={'activity ' + 'activity-' + name + (open ? ' show' : ' hide')}>
			<section className={name}>
                <RecoveryTimeline data={timelineData} config={timelineConfig} onClose={handleClose} />
                </section>
		</div>
	)
};
RecoveryTimelineParent.propTypes = {}

export default RecoveryTimelineParent;
