// import * as React from "react";
import {useEffect, useState} from "react";
import useAppStore from "@/store/useAppStore";
import parse from "html-react-parser";

// import InstallPWA from "ui/buttons/InstallPWA/InstallPWA";
// import {getPWADisplayMode} from "@/utils/isAppInstalled";
// import DaysCounterCTA from "components/activity/DaysCounter/DaysCounterCTA";
import { activities ,strings} from "@/data/config";
// import YourPrivacy from "components/ui/sections/privacy/YourPrivacy";

import "@/utils/IsMobile.js";
import "./styles.scss";

const Introduction = () => {
	
	const name = 'introduction'
	const [open, setOpen] = useState(false);
	const activity = useAppStore(s => s.activity);
	// const isMobile =  useAppStore(s => s.isMobile);

	const activityID = activities.find(activity => (activity.url === name ? activity.id : null));

	const content = strings.activity.find(activity => activity.name === name) || null;
	if (content === null) {
		console.warn(`No content found for activity "${name}"`);
	}

	useEffect(() => {
		setOpen(activityID === activity);
	}, [activity, activityID]);

	

	return (
		<div className={'activity' + (open ? ' show' : ' hide')}>
			<section className='intro' id='intro'>
				<div className='i1'>
					<h2>
						<u>{content.title}</u>
					</h2>
					{content?.content?.map((cnt, i) => {
						return (
							<div key={`intro-${i}`} className={'sub subsection'}>
								<div className='title '>{parse(cnt?.title)}</div>
								{cnt?.content?.map((para, k) => {
									return <p key={k}>{parse(para)}</p>
								})}
							</div>
						)
					})}
				</div>
			</section>
		</div>
	)
};

export default Introduction;
