// import * as React from "react";
import {useEffect, useState} from "react";
import useAppStore from "@/store/useAppStore";
import {activities} from "@/data/config";
import "./styles.scss";

const Introduction = () => {
	const [open, setOpen] = useState(false);

	const activity = useAppStore(s => s.activity);

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
					<p><b className="ummi">Ummi</b> was created to be your toolbox so you can carry those tools around with you for whenever you need them.</p>
				</div>
			</section>
		</div>
	);
};

export default Introduction;
