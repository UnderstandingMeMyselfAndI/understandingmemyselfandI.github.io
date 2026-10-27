import { useState } from "react"
import PropTypes from "prop-types"
import useAppStore from "@store/useAppStore"
import usePrivateStore from "@store/usePrivateStore"
// import HandymanIcon from "@mui/icons-material/Handyman"
// import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined"
import IconHandyman from "@icons/IconHandyman"
import { strings } from "@data/config.js"
import "./buttonToolbox.scss"

const ButtonToolbox = ({ id, classes = [] }) => {
  const isEnabled = usePrivateStore((state) => state.userToolIDs.includes(id))
  const yourToolsEnabled = usePrivateStore((state) => state.yourToolsEnabled)
  const setMessage = useAppStore((s) => s.setMessage)
  const removeTool = usePrivateStore((s) => s.removeTool)
  const addTool = usePrivateStore((s) => s.addTool)
  const [inToolbox, setInToolbox] = useState(isEnabled)

  const handleClick = () => {
    const isIn = !inToolbox
    console.log("isIn ", isIn)

    if (isIn) {
      addTool(id)
      setMessage(strings.toolbox.added)
    } else {
      removeTool(id)
      setMessage(strings.toolbox.removed)
    }

    setInToolbox(isIn)
  }
  if (!yourToolsEnabled) return null

  return (
    <button
      className={"btn toolbox " + (inToolbox ? " active" : "") + classes.map((c) => " " + c)}
      key='toolbox-btn'
      onClick={handleClick}
      aria-label='Toggle toolbox'>
      {inToolbox ? <IconHandyman key='toolbox-btn-icon' /> : <IconHandyman key='toolbox-btn-icon' />}
      <div>{inToolbox ? "Remove" : "Add"}</div>
    </button>
  )
}
ButtonToolbox.propTypes = {
  id: PropTypes.number,
}
ButtonToolbox.displayName = "ButtonToolbox"

export default ButtonToolbox
