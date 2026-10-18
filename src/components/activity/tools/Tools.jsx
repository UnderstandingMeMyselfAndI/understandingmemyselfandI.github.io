import { useMemo, useEffect } from 'react'
import useAppStore from '@store/useAppStore'
import MenuCarousel from '@activity/tools/menuCarousel/MenuCarousel'
import BadgeToolbox from '@ui/badges/BadgeToolbox'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import { prefetchActivity } from '@activity/activityLoaders'
import CloseBtn from '@buttons/close/CloseBtn'
import toolsData from '@data/tools.js'
import { strings } from '@data/config.js'
import './tools.scss'

const COMPONENT_NAME = 'tools'
const COMPONENT_ID = 17

const Tools = () => {
  const data = toolsData.tools.nodes

  const showToolsOnly = useAppStore((s) => s.showToolsOnly)
  const yourToolsEnabled = useAppStore((s) => s.yourToolsEnabled)
  const getActiveToolIDs = useAppStore((s) => s.getActiveToolIDs)
  const setActivity = useAppStore((s) => s.setActivity)
  const setAcronymID = useAppStore((s) => s.setAcronymID)

  const content = strings.activity.find((a) => a.name === COMPONENT_NAME) || null

  if (content === null) {
    console.warn(`No content found for activity "${COMPONENT_NAME}"`)
  }

  useEffect(() => {
    // The only way out of Tools is a tap on a tool, which opens AcronymExplained.
    // Prefetch it so the tap is instant.
    prefetchActivity('AcronymExlpained')
  }, [])

  const activeIDs = getActiveToolIDs()
  const positiveIDsSet = useMemo(() => new Set(activeIDs), [activeIDs])

  const carouselData = useMemo(() => {
    const filteredData = data.filter((obj) => activeIDs.includes(obj.id))
    return showToolsOnly ? filteredData : data
  }, [showToolsOnly, activeIDs, data])

  const handleClick = (id) => () => {
    setActivity(COMPONENT_ID)
    setAcronymID(id)
  }

  const handleClose = () => {
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
    <div className='activity acronym-tools fixed show'>
      <BadgeToolbox showBadge={yourToolsEnabled} />
      <section className='tools' id='the-tools'>
        <div className='tools-inner'>
          <CloseBtn onClick={handleClose} />
          <header>
            <h2>{parse(DOMPurify.sanitize(content?.title))}</h2>
            <div className='intro'>{parse(DOMPurify.sanitize(content?.introduction))}</div>
          </header>
          <div className='tools-wrapper'>
            <MenuCarousel
              handleClick={handleClick}
              data={carouselData}
              filterIDs={positiveIDsSet}
              showFavourites={yourToolsEnabled}
              description={descriptionContent}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Tools
