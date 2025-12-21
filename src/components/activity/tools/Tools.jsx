import {useEffect, useState} from "react";
import useAppStore from "@/store/useAppStore";
import {activities} from "@/data/config";
import MenuCarousel from "@/components/ui/menuCarousel/MenuCarousel";
import parse from "html-react-parser";
import { strings } from "@/data/config";
import "./styles.scss";
import PropTypes from "prop-types";
const Tools = () => {

	const name = 'tools'
	
	const [open, setOpen] = useState(true);

	const activity = useAppStore(s => s.activity);

	const activityID = activities.find(activity => (activity.url === name ? activity.id : null));

	 const content = strings.activity.find(activity => activity.name === name) || null;
    if (content === null) {
        console.warn(`No content found for activity "${name}"`);
    }

	useEffect(() => {
		setOpen(activityID === activity);
	}, [activity, activityID]);

	return (
		<div className={"activity" + (open ? " show" : " ")}>
			<section className="tools" id="tools">
				<h2>
					<u>{content?.title}</u>
				</h2>
				{content?.content?.map((html, i) => {
					return (
						<p key={i}>{parse(html)}</p>
					)
				}
				)}
				
				<MenuCarousel />
			</section>
		</div>
	);
};
Tools.propTypes = {
	handleMenuClick: PropTypes.func,
};
export default Tools;
