import * as React from "react";
import {useEffect} from "react";
import Badge from "@mui/material/Badge";
import {createTheme, alpha, getContrastRatio, ThemeProvider} from "@mui/material/styles";
import useAppStore from "@/store/useAppStore";
import HandymanIcon from "@mui/icons-material/Handyman";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {storeKeys, localStore} from "data/localStore.js";
import data from "data/data.js";
import Slide from "@mui/material/Slide";
// import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import strings from "data/strings.js";
import "./BadgeToolbox.scss";

export default function BadgeToolbox() {
	const allAccronyms = data;
	const ids = allAccronyms.map(item => item.id);
	const positiveIDs = localStore.getSelectedIDsByLabel(storeKeys.toolbox, ids);
	const [openAlert, setOpenAlert] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [numTools, setNumTools] = React.useState(positiveIDs.length);

	const {showToolsOnly, toggleShowToolsOnly, userToolIDs} = useAppStore();
	const blueGreyBase = "#819ec9";
	const blueGreyMain = alpha(blueGreyBase, 0.95);
	const greyBase = "#303030ff";
	const greyMain = alpha(greyBase, 0.75);

	useEffect(() => {
		setNumTools(userToolIDs.length);
	}, [userToolIDs]);

	const theme = createTheme({
		palette: {
			blueGrey: {
				main: blueGreyMain,
				light: alpha(blueGreyBase, 0.5),
				dark: alpha(blueGreyBase, 0.95),
				contrastText: getContrastRatio(blueGreyMain, "#fff") > 4.5 ? "#fff" : "#111",
			},
			darkGrey: {
				main: greyMain,
				light: alpha(greyBase, 0.5),
				dark: alpha(greyBase, 0.95),
				contrastText: getContrastRatio(greyMain, "#fff") > 4.5 ? "#fff" : "#111",
			},
		},
	});

	useEffect(() => {
		window.addEventListener("scroll", () => {
			window.scrollY > 600 ? setOpen(true) : setOpen(false);
		});
	}, [setOpen]);

	const handleClose = () => {
		setOpenAlert(false);
	};

	const handleOpen = () => {
		setOpenAlert(true);
		toggleShowToolsOnly();
	};

	return (
		<div>
			<Snackbar
				className={"snackBar alert"}
				open={openAlert}
				autoHideDuration={2000}
				onClose={handleClose}
				slots={{transition: Slide}}
				anchorOrigin={{vertical: "top", horizontal: "center"}}
			>
				<Alert
					onClose={handleClose}
					severity={showToolsOnly ? "success" : "info"}
					variant="filled"
					sx={{width: "100%"}}
					iconMapping={{
						success: <HandymanOutlinedIcon fontSize="inherit" />,
						info: <CheckCircleOutlineIcon fontSize="inherit" />,
					}}
				>
					{showToolsOnly ? strings.tools.list.yourToolsFiltered : strings.tools.list.unfiltered}
				</Alert>
			</Snackbar>
			<div className={"badge-cont " + (open ? "" : " hide")}>
				<ThemeProvider theme={theme}>
					<Badge
						className={"badge toolbox" + (showToolsOnly ? " active" : "")}
						badgeContent={positiveIDs.length}
						onClick={handleOpen}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
					>
						<HandymanIcon className="icon" />
					</Badge>
				</ThemeProvider>
			</div>
		</div>
	);
}
