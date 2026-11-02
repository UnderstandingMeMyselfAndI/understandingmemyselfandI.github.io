import IconHandyman from "@icons/IconHandyman"
import PropTypes from "prop-types"

import "./toolsBTN.scss"
const ToolsBtn = ({ label = "Tools", clickHandler }) => {
  return (
    <button onClick={clickHandler} className={`${label.toLowerCase()}-btn btn`} aria-label={label}>
      <IconHandyman />
      <div>{label}</div>
    </button>
  )
}
ToolsBtn.propTypes = {
  label: PropTypes.string,
  clickHandler: PropTypes.func,
}
export default ToolsBtn
