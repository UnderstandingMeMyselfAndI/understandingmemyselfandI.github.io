import * as React from "react";
import {useEffect} from "react";
import Badge from "@mui/material/Badge";
// import {createTheme, alpha, getContrastRatio, ThemeProvider} from "@mui/material/styles";
import useAppStore from "@/store/useAppStore";
import HandymanIcon from "@mui/icons-material/Handyman";

import {storeKeys, localStore} from "data/localStore.js";
import data from "data/data.js";
// import CheckIcon from "@mui/icons-material/Check";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import {strings} from "data/config.js";

import "./BadgeToolbox.scss";

export default function BadgeToolbox() {
	const allAccronyms = data
	const ids = allAccronyms.map((item) => item.id)
	// const positiveIDs = localStore.getSelectedIDsByLabel(storeKeys.toolbox, ids)
	const activeIDs = useAppStore((state) => state.userToolIDs)
	const showAccCard = useAppStore((s) => s.showAccCard)
	const toolsInView = useAppStore((s) => s.toolsInView)

	// const activity = useAppStore((s) => s.activity)
	// const [openAlert, setOpenAlert] = React.useState(false);
	const [show, setShow] = React.useState(false)
	// const [numTools, setNumTools] = React.useState(positiveIDs.length)

	const toggleShowToolsOnly = useAppStore((s) => s.toggleShowToolsOnly)
	// const userToolIDs = useAppStore((s) => s.userToolIDs)
	const showToolsOnly = useAppStore((s) => s.showToolsOnly)
	const setMessage = useAppStore((s) => s.setMessage)

	useEffect(() => {
		setShow(toolsInView)
	}, [toolsInView])

	useEffect(() => {
		if (window.scrollY < 600) return
		setShow(!showAccCard)
	}, [showAccCard, setShow])

	const handleTouch = () => {
		// set the message as the opposite here
		if (showToolsOnly) {
			setMessage(strings.tools.list.unfiltered)
		} else {
			setMessage(strings.tools.list.yourToolsFiltered)
		}
		setTimeout(() => {
			const el = document.getElementById('tools')

			el.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}, 0)

		// setOpenAlert(true);
		toggleShowToolsOnly()
	}

	return (
		<div>
			<div className={'badge-cont ' + (show ? '' : ' hide')}>
				<Badge
					className={'badge toolbox' + (showToolsOnly ? ' active' : '')}
					badgeContent={activeIDs.length}
					onClick={handleTouch}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
				>
					<HandymanIcon className='icon' />
				</Badge>
			</div>
		</div>
	)
}
