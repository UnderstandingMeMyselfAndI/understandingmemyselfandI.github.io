import useAppStore from "@store/useAppStore"
import usePrivateStore from "@store/usePrivateStore"
import IconHandyman from "@icons/IconHandyman"
import { strings } from "@data/config.js"

import "./badgeToolbox.scss"

export default function BadgeToolbox({ showBadge = true }) {
  const activeIDs = usePrivateStore((state) => state.userToolIDs)
  const setFilterTools = usePrivateStore((s) => s.setFilterTools)
  const filterTools = usePrivateStore((s) => s.filterTools)
  const setMessage = useAppStore((s) => s.setMessage)

  const handleChange = () => {
    if (activeIDs.length < 1) {
      setMessage("No tools in your toolbox. Favourite a tool first.")
      return
    }
    if (filterTools) {
      // set the message as the opposite here
      setMessage(strings.tools.list.unfiltered)
    } else {
      setMessage(strings.tools.list.yourToolsFiltered)
    }

    setFilterTools(!filterTools)
  }

  return (
    <div
      className={"badge toolbox" + (filterTools ? " active" : "") + (showBadge ? "" : " hide")}
      onClick={handleChange}>
      <div className={"badge-toolbox"}>
        <div className='badge-toolbox__count'>{activeIDs.length}</div>
        <IconHandyman className='badge-toolbox__icon' />
      </div>
    </div>
  )
}
