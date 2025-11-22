import * as React from "react";
import {useState, useEffect} from "react";
import useAppStore from "@/store/useAppStore";
import ButtonToolbox from "../buttons/toolbox/ButtonToolbox";
import ButtonEmergencyToolbox from "../buttons/toolbox/ButtonEmergencyToolbox";
import parse from "html-react-parser";
import data from "../../../data/data.js";
import {storeKeys, localStore} from "@/data/localStore.js";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.scss";
function getAccData(id) {
	return data.find(acc => acc.id === id);
	// return data.find(id => data.id === id);
}

const AcronymCard = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [storedValue, setStoredValue] = useState(null);
	const [accData, setAccData] = useState(null);

	const acronymnID = useAppStore(state => state.acronymnID);
	const toolAdded = useAppStore(state => state.toolAdded);
	const setActive = useAppStore(state => state.setActive);
	const active = useAppStore(state => state.active);

	useEffect(() => {
		if (acronymnID === null || acronymnID === undefined) return;

		if (getAccData(acronymnID) !== undefined) {
			setAccData(getAccData(acronymnID));
			setIsOpen(true);
		}

		console.log("acronymnID", acronymnID);
	}, [acronymnID]);

	const handleClose = () => {
		setIsOpen(false);
		// setActive(false);
	};

	return (
		<div
			className={"AcronymCard" + (isOpen ? " open" : "")}
			key="acronym-card"
		>
			<div className="header">
				<div className="title cont">
					{accData?.title.split(".").map(
						(letter, index) =>
							letter && (
								<div
									className="active"
									key={index}
									data-content={letter}
								>
									{letter}
								</div>
							)
					)}
				</div>
			</div>
			<section className="AccContent">
				<div className="AccGroup">
					<div className="AccExplanation">{accData && parse(accData?.content.explanation)}</div>

					{accData?.content.acronyms.map((acronym, index) => (
						<div
							key={"acronymn-" + index}
							className="AccDetails"
						>
							<div
								className="Acc-letter-group"
								key={"t-" + index}
							>
								<div
									className="Acc-letter"
									key={"l-" + index}
								>
									{acronym.letter}
								</div>
								<div
									className="Acc-word"
									key={"m-" + index}
								>
									{acronym.meaning.substring(1)}
								</div>
							</div>
							<div
								key={"d-" + index}
								className="Acc-definition"
							>
								{acronym.definition && parse(acronym.definition)}
							</div>
						</div>
					))}
				</div>

				<div></div>
				<div></div>
			</section>
			<div className="footer">
				<ButtonEmergencyToolbox id={accData?.id} />
				<ButtonToolbox id={accData?.id} />
				<div
					className="btn close"
					onClick={handleClose}
				>
					<CloseIcon />
				</div>
			</div>
		</div>
	);
};

AcronymCard.displayName = "AcronymCard";

export default AcronymCard;
