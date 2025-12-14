// import * as React from "react";
import {useState, useEffect, useRef} from "react";
import useAppStore from "@/store/useAppStore";
import ButtonToolbox from "../buttons/toolbox/ButtonToolbox";
import Backdrop from "ui/backdrop/Backdrop";

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
// import {storeKeys, localStore} from "@/data/localStore.js";
// import ButtonEmergencyToolbox from "../buttons/toolbox/ButtonEmergencyToolbox";
import parse from "html-react-parser";
import data from "../../../data/data.js";
// import {storeKeys, localStore} from "@/data/localStore.js";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import HdrAutoOutlinedIcon from "@mui/icons-material/HdrAutoOutlined";
import Skeleton from "@mui/material/Skeleton";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";

import {extractYouTubeId} from "@/js/utils.js";
import "./styles.scss";
function getAccData(id) {
	return data.find(acc => acc.id === id);
}

const AcronymCard = () => {
	const [open, setOpen] = useState(false);
	const [accData, setAccData] = useState(null);

	const acronymnID = useAppStore(s => s.acronymnID);
	const showAccCard = useAppStore(s => s.showAccCard);
	const setShowAccCard = useAppStore(s => s.setShowAccCard);
	const setActivity = useAppStore(s => s.setActivity);

	const contentRef = useRef(null);
	useEffect(() => {
		setAccData(getAccData(acronymnID));
		contentRef.current.scrollTop = 0;
	}, [acronymnID]);

	useEffect(() => {
		setOpen(showAccCard);
	}, [showAccCard]);

	const handleClose = () => {
		setShowAccCard(false);
		setActivity(-1);
	};

	const smoothScrollTo = e => {
		e.preventDefault();
		const element = document.getElementById("videos");
		element.scrollIntoView({
			block: "start",
			behavior: "smooth", // smooth scroll
		});
	};
	const smoothToAccronym = e => {
		e.preventDefault();
		const element = document.getElementById("AccContent");
		element.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth", // smooth scroll
		});
	};

	return (
		<div
			className={"AcronymCard" + (open ? " open" : "")}
			key="acronym-card"
		>
			<div className="inner">
				<div className="header">
					<div className="title cont">
						{accData ? (
							accData?.title.split(".").map(
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
							)
						) : (
							<Skeleton animation="wave" />
						)}
					</div>
				</div>
				<section
					className="AccContent"
					id="AccContent"
					ref={contentRef}
				>
					<div className="AccGroup">
						<div className="AccExplanation">{accData?.content ? parse(accData.content.explanation) : <Skeleton animation="wave" />}</div>

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
										data-len={acronym.meaning.length}
										key={"m-" + index}
									>
										{/* {acronym.meaning.substring(1)} */}
										{acronym.meaning}
									</div>
								</div>
								<div
									key={"d-" + index}
									className="Acc-definition"
								>
									{acronym.definition ? parse(acronym.definition) : <Skeleton animation="wave" />}
								</div>
							</div>
						))}
					</div>
					{accData?.videos.length > 0 && (
						<div
							className="videos"
							id="videos"
						>
							<h3>VIDEOS</h3>

							{accData?.videos.map((video, index) => (
								<div
									className="video"
									key={index}
								>
									<div className="title">{parse(video.title)}</div>
									<div className="player">
										{video ? (
											
											<LiteYouTubeEmbed
												id={extractYouTubeId(video.url)}											
												title={video.title}
												key={"video-" + index}
												poster="hqdefault"
											/>
										) : (
											<Skeleton
												animation="wave"
												className="video-skeleton"
											/>
										)}
									</div>
								</div>
							))}
						</div>
					)}
					<div></div>
					<div></div>
				</section>
				<div
					className="footer"
					key="acronym-card-footer"
				>
					{/* <ButtonEmergencyToolbox id={accData?.id} />
					 */}
					<ButtonToolbox
						id={accData?.id}
						key={`toolbox-btn-${accData?.id}`}
					/>
					{accData?.videos.length > 0 && (
						<button
							onClick={smoothScrollTo}
							className="btn video"
							key={`video-btn-${accData?.id}`}
						>
							<OndemandVideoOutlinedIcon key={`video-icon-${accData?.id}`} />
						</button>
					)}
					{accData?.videos.length > 0 && (
						<button
							onClick={smoothToAccronym}
							className="btn top"
							key={`goto-top-btn-${accData?.id}`}
						>
							<HdrAutoOutlinedIcon key={`goto-top-icon-${accData?.id}`} />
						</button>
					)}

					<div
						className="btn close"
						onClick={handleClose}
					>
						<KeyboardReturnOutlinedIcon />
					</div>
				</div>

				
			</div>
			<Backdrop
					initialImageId={3}
					initialDelay={3000}
					interval={6000}
					parallaxStrength={0}
				/>
		</div>
	);
};
AcronymCard.displayName = "AcronymCard";

export default AcronymCard;
