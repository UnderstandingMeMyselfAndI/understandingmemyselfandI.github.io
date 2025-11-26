// import * as React from "react";
import {useState, useEffect, useRef} from "react";
import useAppStore from "@/store/useAppStore";
import ButtonToolbox from "../buttons/toolbox/ButtonToolbox";
import BackdropParallax from "ui/backdrop/BackdropParallax";
import ReactPlayer from "react-player";

// import ButtonEmergencyToolbox from "../buttons/toolbox/ButtonEmergencyToolbox";
import parse from "html-react-parser";
import data from "../../../data/data.js";
// import {storeKeys, localStore} from "@/data/localStore.js";
import CloseIcon from "@mui/icons-material/Close";
import Skeleton from "@mui/material/Skeleton";
import "./styles.scss";
function getAccData(id) {
	return data.find(acc => acc.id === id);
}

const AcronymCard = () => {
	const [accData, setAccData] = useState(null);
	const acronymnID = useAppStore(state => state.acronymnID);
	const setShowAccCard = useAppStore(state => state.setShowAccCard);
	const showAccCard = useAppStore(state => state.showAccCard);
	const contentRef = useRef(null);
	useEffect(() => {
		setAccData(getAccData(acronymnID));
		contentRef.current.scrollTop = 0;
	}, [acronymnID]);

	const handleClose = () => {
		setShowAccCard(false);
	};

	return (
		<div
			className={"AcronymCard" + (showAccCard ? " open" : "")}
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
										{acronym.meaning.substring(1)}
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
						<div className="videos">
							<h2>VIDEOS</h2>

							{accData?.videos.map((video, index) => (
								<div
									className="video"
									key={index}
								>
									<div className="title">{parse(video.title)}</div>
									<div className="player">
										{video ? (
											<ReactPlayer
												light={false}
												controls={true}
												src={video.url}
												style={{
													width: "100%",
													height: "100%",
												}}
												config={{
													youtube: {
														color: "black",
													},
												}}
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
				<div className="footer">
					{/* <ButtonEmergencyToolbox id={accData?.id} />
					 */}
					<ButtonToolbox id={accData?.id} />
					<div
						className="btn close"
						onClick={handleClose}
					>
						<CloseIcon />
					</div>
				</div>

				<BackdropParallax
					initialImageId={3}
					initialDelay={3000}
					interval={6000}
					parallaxStrength={0}
				/>
			</div>
		</div>
	);
};
AcronymCard.displayName = "AcronymCard";

export default AcronymCard;
