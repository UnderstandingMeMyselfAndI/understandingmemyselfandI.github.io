// import * as React from "react";
import {useEffect, useState} from "react";
import useAppStore from "@/store/useAppStore";
import { activities } from "@/data/config";
import InstallPWA from "ui/buttons/InstallPWA/InstallPWA";
import {getPWADisplayMode} from "@/utils/isAppInstalled";
import DaysCounterBtn from "ui/buttons/daysCounter/daysCounterBtn";

import "@/utils/IsMobile.js";
import "./styles.scss";

const Introduction = () => {
	const [open, setOpen] = useState(false);


	const activity = useAppStore(s => s.activity);
	// const isMobile =  useAppStore(s => s.isMobile);

	const activityID = activities.find(activity => (activity.url === "introduction" ? activity.id : null));

	useEffect(() => {
		setOpen(activityID === activity);
	}, [activity, activityID]);

	return (
		
		<div className={"activity" + (open ? " show" : " hide")}>
			
			<section className="intro">				
				<div className="i1">
					<h2><u>Hey</u></h2>
					<p>The tools we learn to cope with our<br />emotions, thoughts, feelings<br />and mental health are ace, but<br /> <b><u>remembering them can be hard.</u></b></p></div>
				<div className="i2">
					<p><span className="ummi">Ummi</span><br />is your toolbox to carry those tools around for when you need them.</p>
				</div>
				{getPWADisplayMode() !== 'fullscreen' && (
					<div className="i3 quick-access">
						{/* <p>The app is being constantly updated with <b><u>new tools</u></b>, <b><u>video guides</u></b>, <b><u>success stories</u></b>, and <b><u>motivational content</u></b> to help you cope with your emotions, thoughts, feelings and mental health throughout <b><u>your journey.</u></b></p> */}
						<div className="title">For quick access</div>
					
						
						{/* <p><b className="ummi">Ummi</b> can be added to your {isMobile ? "home screen" : "desktop"} for easy access. </p> */}
					
						<InstallPWA />
					</div>)}

				<div className="days-section">
					<div className="title">Remind yourself how far you have come.</div>
					<DaysCounterBtn />
				</div>
			</section>
		</div>
	);
};

export default Introduction;
