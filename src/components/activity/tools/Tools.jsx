import { useMemo, useEffect } from "react"
import useAppStore from "@store/useAppStore"
import usePrivateStore from "@store/usePrivateStore"
import MenuCarousel from "@activity/tools/menuCarousel/MenuCarousel"
import BadgeToolbox from "@ui/badges/BadgeToolbox"
import parse from "html-react-parser"
import DOMPurify from "dompurify"
import { prefetchActivity } from "@activity/activityLoaders"
import CloseBtn from "@buttons/close/CloseBtn"
import toolsData from "@data/tools.js"
import { strings } from "@data/config.js"
import "./tools.scss"

const component_id = 17
const component_name = "tools"
const Tools = () => {
  const data = toolsData.tools.nodes

  const yourToolsEnabled = usePrivateStore((s) => s.yourToolsEnabled)
  const filterTools = usePrivateStore((s) => s.filterTools)
  const getActiveToolIDs = usePrivateStore((s) => s.getActiveToolIDs)
  const setActivity = useAppStore((s) => s.setActivity)
  const setAcronymID = useAppStore((s) => s.setAcronymID)
  const setMenuCarouselPosition = useAppStore((s) => s.setMenuCarouselPosition)

  const content = strings.activity.find((a) => a.name === component_name) || null

  if (content === null) {
    console.warn(`No content found for activity "${component_name}"`)
  }

  useEffect(() => {
    // The only way out of Tools is a tap on a tool, which opens AcronymExplained.
    // Prefetch it so the tap is instant.
    prefetchActivity("AcronymExplained")
  }, [])

  const activeIDs = getActiveToolIDs()
  const positiveIDsSet = useMemo(() => new Set(activeIDs), [activeIDs])

  const carouselData = useMemo(() => {
    const filteredData = data.filter((obj) => activeIDs.includes(obj.id))
    return filterTools ? filteredData : data
  }, [filterTools, activeIDs, data])

  const handleClick = (id) => () => {
    setActivity(component_id)
    setAcronymID(id)
  }

  const handleClose = () => {
    setMenuCarouselPosition(null)
    setActivity(-1)
  }

  const descriptionContent = content?.description && (
    <div className='tools-description'>
      {content.description.map((html, i) => (
        <p key={i}>{parse(DOMPurify.sanitize(html))}</p>
      ))}
    </div>
  )

  return (
    <div className={`activity activity-${component_name}`}>
      <section id='the-tools'>
        <div className='tools'>
          <CloseBtn onClick={handleClose} />
          <header>
            <div className='tools_title'>
              <h2 className={filterTools ? "your-tools" : ""}>{filterTools ? "Your " : "All "} Tools</h2>
              <div className='tools__intro'>{content?.introduction}</div>
            </div>

            <BadgeToolbox showBadge={yourToolsEnabled} />
          </header>
          <div className='tools-wrapper'>
            <MenuCarousel
              handleClick={handleClick}
              data={carouselData}
              filterIDs={positiveIDsSet}
              showFavourites={yourToolsEnabled}
              description={descriptionContent}
              filterTools={filterTools}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Tools
