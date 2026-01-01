// import * as React from "react";
import {useEffect, useState} from "react";
import useAppStore from "@/store/useAppStore";
import parse from "html-react-parser";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline'
// import InstallPWA from "ui/buttons/InstallPWA/InstallPWA";
// import {getPWADisplayMode} from "@/utils/isAppInstalled";
// import DaysCounterCTA from "components/activity/DaysCounter/DaysCounterCTA";
import { activities ,strings} from "@/data/config";
// import YourPrivacy from "components/ui/sections/privacy/YourPrivacy";

import "@/utils/IsMobile.js";
import "./styles.scss";

const Introduction = () => {
	const name = 'introduction'
	const [open, setOpen] = useState(false)
	const activity = useAppStore((s) => s.activity)
	const activityID = activities.find((activity) => (activity.url === name ? activity.id : null))

	const content = strings.activity.find((activity) => activity.name === name) || null
	if (content === null) {
		console.warn(`No content found for activity "${name}"`)
	}

	const isInstalled = useAppStore((state) => state.isInstalled)
	const vc = useAppStore((state) => state.vc) // visit count

	useEffect(() => {
		setOpen(activityID === activity)
	}, [activity, activityID])

	function getRand(max) {
		return Math.floor(Math.random() * (max - 1 + 1)) + 1
	}

	return (
		<div className={'activity' + (open ? ' show' : ' hide')}>
			<section className='intro' id='intro'>
				<div className='i1'>
					<h2>
						{!isInstalled && <u>{content.title}</u>}

						{isInstalled && vc >= 3 && <u>{parse(content?.returning?.content?.titles[getRand(content?.returning?.content?.titles?.length - 1)])}</u>}
					</h2>
					{isInstalled &&
						vc > 0 &&
						vc < 3 && // if app is installed show different content
						content?.installed.content?.map((cnt, i) => {
							return (
								<div key={`intro-${i}`} className={'sub subsection installed sec-' + i}>
									<div className='title '>{parse(cnt?.title)}</div>
									{cnt?.content?.map((para, k) => {
										return (
											<div className='' key={'p-' + k}>
												{i === 1 && <DoneOutlineIcon className='icon' />}
												<p key={k}>{parse(para)}</p>
											</div>
										)
									})}
								</div>
							)
						})}

					{isInstalled && vc >= 3 && (
						<div key={`intro`} className={'sub subsection sec-'}>
							<div className=' returning'>{parse(content?.returning?.content?.contents[getRand(content?.returning?.content?.contents?.length - 1)])}</div>
						</div>
					)}

					{!isInstalled &&
						content?.content?.map((cnt, i) => {
							return (
								<div key={`intro-${i}`} className={'sub subsection sec-' + i}>
									<div className='title '>{parse(cnt?.title)}</div>
									{cnt?.content?.map((para, k) => {
										return (
											<div className='point' key={'p-' + k}>
												{i === 1 && <DoneOutlineIcon className='icon' />}
												<p key={k}>{parse(para)}</p>
											</div>
										)
									})}
								</div>
							)
						})}
				</div>
			</section>
		</div>
	)
}

export default Introduction;
