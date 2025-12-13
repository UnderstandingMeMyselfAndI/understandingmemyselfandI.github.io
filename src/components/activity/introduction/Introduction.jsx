// import * as React from "react";
import {useEffect, useState} from "react";
import useAppStore from "@/store/useAppStore";
import { activities } from "@/data/config";
import InstallPWA from "ui/buttons/InstallPWA/InstallPWA";
import {getPWADisplayMode} from "@/utils/isAppInstalled";

import "@/utils/IsMobile.js";
import "./styles.scss";

const Introduction = () => {
	const [open, setOpen] = useState(false);

	const isInstalled = useAppStore(s => s.isInstalled);	

	const activity = useAppStore(s => s.activity);
	const isMobile =  useAppStore(s => s.isMobile);

	const activityID = activities.find(activity => (activity.url === "introduction" ? activity.id : null));

	useEffect(() => {
		setOpen(activityID === activity);
	}, [activity, activityID]);

	return (
		
		<div className={"activity" + (open ? " show" : " hide")}>
			
			<section className="intro">				
				<div className="i1">
					<h2><u>Hey</u></h2>
					<p>The tools we learn to cope with our emotions, thoughts, feelings and mental health are ace, but remembering them can be hard.</p></div>
				<div className="i2">
					<p><b className="ummi">Ummi</b><br />was created to be your toolbox so you can carry those tools around with you for whenever you need them.</p>
				</div>
				<div className="i3">
					<p>The app is being constantly updated with <b><u>new tools</u></b>, <b><u>video guides</u></b>, <b><u>success stories</u></b>, and <b><u>motivational content</u></b> to help you cope with your emotions, thoughts, feelings and mental health throughout <b><u>your journey.</u></b></p>
					
					{getPWADisplayMode() !== 'fullscreen' && (
					<><p><b className="ummi">Ummi</b> can be added to your {isMobile ? "home screen" : "desktop"} for easy access. </p>
					
					<InstallPWA /></>
				)}
				</div>
			</section>
		</div>
	);
};

export default Introduction;
