import {useEffect, useState} from "react";
import useAppStore from "@/store/useAppStore";
import {activities} from "@/data/config";
import "./styles.scss";

const Template = () => {
	const [open, setOpen] = useState(false);
	const activity = useAppStore(s => s.activity);
	const activityID = activities.find(activity => (activity.url === "url" ? activity.id : null));

	useEffect(() => {
		setOpen(activityID === activity);
	}, [activity, activityID]);

	// const handleClose = () => setOpen(false);

	return (
		<div className={"activity" + (open ? " show" : " hide")}>
			<section className=""></section>
		</div>
	);
};

export default Template;
