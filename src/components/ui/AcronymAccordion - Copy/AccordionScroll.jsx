// AccordionScroll.jsx
import React, {useState, useRef, useEffect, memo} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Skeleton from "@mui/material/Skeleton";
import useAppStore from "@/store/useAppStore";
import data from "../../../data/data.js";
import ButtonToolbox from "buttons/toolbox/ButtonToolbox";
import useScrollEffects from "./useScrollEffects";

import "../../../globals.css";
import "./AccordionStyles.scss";

// stable config – defined once outside any component
const masterConfig = {
	minOpacity: 0.28,
	minScale: 0.32,
	fadeBoundary: 0.8,
	intensity: 2,
	easePower: 1.2,
	itemGap: "0.001rem",
};

const AccordionItem = memo(({item, index, expanded, onToggle}) => {
	const active = expanded === `panel${index}`;
	const [scrollRef, opacity, scale] = useScrollEffects(masterConfig, active);
	const accordionRef = useRef(null);
	const prev = useRef(active);

	const setActive = useAppStore(state => state.setActive);

	const setAcronymnID = useAppStore(s => s.setAcronymnID);

	useEffect(() => {
		if (!accordionRef.current) return;

		if (active && !prev.current) {
			document.body.style.overflow = "hidden";
			setAcronymnID(index);
			setActive(true);

			setTimeout(() => {
				const el = accordionRef.current;
				if (el) {
					const targetY = el.getBoundingClientRect().top + window.pageYOffset - window.innerHeight * 0.05;
					window.scrollTo({top: targetY, behavior: "smooth"});
				}
			}, 50);
		} else if (!active && prev.current) {
			document.body.style.overflow = "";
			setActive(false);

			// setTimeout(() => {
			// 	const el = accordionRef.current;
			// 	if (el) {
			// 		//const rect = el.getBoundingClientRect();
			// 		//const targetY = window.pageYOffset + rect.top + rect.height / 2 - window.innerHeight / 2;
			// 		//window.scrollTo({top: targetY, behavior: "smooth"});
			// 	}
			// }, 450);
		}
		prev.current = active;
	}, [active, index, setAcronymnID, setActive]);

	return (
		<div
			ref={active ? null : scrollRef}
			style={{opacity, transform: `scale3d(${scale}, ${scale}, 1)`}}
			className={active ? "expanded-accordion" : ""}
		>
			<Accordion
				ref={accordionRef}
				expanded={active}
				onChange={onToggle}
				className="AccordionItem"
			>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<ButtonToolbox id={index} />
					<div className="cont">{item.title.split(".").map((l, i) => l && <div key={i}>{l}</div>)}</div>
				</AccordionSummary>

				<AccordionDetails>
					<div dangerouslySetInnerHTML={{__html: item.content.explanation}} />
					{item.content.acronyms.map((a, i) => (
						<div key={i}>
							<div className="Acronym-title">
								<div className="Acronym-letter">{a.letter}</div>
								<div className="Acronym-word">{a.meaning}</div>
							</div>
							<div
								className="Acronym-definition"
								dangerouslySetInnerHTML={{__html: a.definition}}
							/>
						</div>
					))}
				</AccordionDetails>
			</Accordion>
		</div>
	);
});

export default function AccordionScroll() {
	const [expanded, setExpanded] = useState(false);

	const handleToggle = panel => () => {
		setExpanded(expanded === panel ? false : panel);
	};

	useEffect(() => {
		setActive(expanded);
	}, [expanded]);

	return (
		<div
			className="AccordionRoot"
			style={{"--accordion-gap": masterConfig.itemGap}}
		>
			{data.map((item, i) => {
				if (!item)
					return (
						<Skeleton
							key={i}
							variant="rounded"
							height={140}
							animation="wave"
						/>
					);

				const panel = `panel${i}`;
				return (
					<AccordionItem
						key={panel}
						item={item}
						index={i}
						expanded={expanded}
						onToggle={handleToggle(panel)}
					/>
				);
			})}
		</div>
	);
}
