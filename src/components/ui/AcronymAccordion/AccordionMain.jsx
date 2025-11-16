import React, {useState} from "react";
// import {useState} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import Skeleton from "@mui/material/Skeleton";
import ScenarioDialog from "../dialog/ScenarioDialog";
import classNames from "classnames";
import data from "../../../data/data.js";
import Favourite from "../favourite/Favourite.jsx";
import {TransitionGroup} from "react-transition-group";
import Collapse from "@mui/material/Collapse";
// import Button from "@mui/material/Button";
import "../../../globals.css";
import "./AccordionStyles.css";
export default function MainAccordions() {
	// const [expanded, setExpanded] = useState("panel1");

	// const handleChange = panel => (event, newExpanded) => {
	// 	setExpanded(newExpanded ? panel : false);
	// };

	const [expanded, setExpanded] = useState(false);
	// const [open, setOpen] = useState(expanded);

	const handleChange = panel => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	// const showFavouriteData = localStorage.getItem("filterFavs");
	// const favourites = data.filter(a => localStorage.getItem(`favourite-item-${a.id}`));

	// Either use all data or just the users favourites
	// const componentData = showFavouriteData ? favouriteData : data;
	const componentData = data;

	return (
		<div className={"AccordionRoot"}>
			{componentData.map((item, i) =>
				item ? (
					// <Collapse key={item}>
					<Accordion
						key={"accordion-" + i}
						expanded={expanded === "panel" + i} //"panel1"
						onChange={handleChange("panel" + i)}
						slotProps={{
							transition: {unmountOnExit: true},
							heading: {component: "h3"},
						}}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls={"panel" + i + "-content"}
							id={"panel" + i + "-header"}
						>
							<Favourite
								id={"item-" + item?.id}
								className={item?.title?.replaceAll(".", "")}
							/>
							<Typography component="span">{item.title}</Typography>

							<CloseIcon
								className={"btn close"}
								onClick={handleChange(`panel${i}`)}
							/>
						</AccordionSummary>
						<AccordionDetails>
							<div dangerouslySetInnerHTML={{__html: item.content.explanation}} />
							{item.content.acronyms.map((acronym, index) => (
								<div key={"acronymn-" + index}>
									<div key={"m-" + index}>{acronym.meaning}</div>
									<div
										key={"d-" + index}
										className="Acronym-definition"
										dangerouslySetInnerHTML={{__html: acronym.definition}}
									/>
								</div>
							))}
						</AccordionDetails>
					</Accordion>
				) : (
					<Skeleton
						variant="rounded"
						animation="wave"
					/>
				)
			)}
		</div>
	);
}

function Scenarios(item) {
	return (
		<div className="scenarios">
			<div className="title">Scenarios</div>
			<div className="scenariosGroup">
				{item.scenarios.map((scenario, i) => (
					<ScenarioDialog
						btnLabel={scenario.btnLabel}
						title={scenario.title}
						content={scenario.content}
						key={"scenario-" + i}
					/>
				))}
			</div>
		</div>
	);
}
