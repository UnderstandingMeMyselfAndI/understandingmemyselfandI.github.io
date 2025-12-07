import {useEffect, useState} from "react";
import useAppStore from "@/store/useAppStore";
import {activities} from "@/data/config";
import MenuCarousel from "@/components/ui/menu/MenuCarousel";
import "./styles.scss";
import PropTypes from "prop-types";
const Tools = () => {
	const [open, setOpen] = useState(true);

	const activity = useAppStore(s => s.activity);

	const activityID = activities.find(activity => (activity.url === "tools" ? activity.id : null));

	useEffect(() => {
		setOpen(activityID === activity);
	}, [activity, activityID]);

	return (
		<div className={"activity" + (open ? " show" : " ")}>
			<section className="tools" id="tools">
				<h2>
					<u>Tools:</u>
				</h2>
				<p>Tap a heading to read out about the tool.</p>
				<MenuCarousel />
			</section>
		</div>
	);
};
Tools.propTypes = {
	handleMenuClick: PropTypes.func,
};
export default Tools;
