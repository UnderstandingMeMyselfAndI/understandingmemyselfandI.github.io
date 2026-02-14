import { useEffect, useState, useMemo } from 'react'
import useAppStore from '@/store/useAppStore'
import MenuCarousel from '@/components/activity/tools/menuCarousel/MenuCarousel'
import BadgeToolbox from 'ui/badges/BadgeToolbox'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import CloseBtn from '@/components/ui/buttons/close/CloseBtn.jsx'
import toolsData from '../../../data/tools.js'
import { strings } from '@/data/config'
import PropTypes from 'prop-types'
import { activities } from '@/data/config'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})
import './styles.scss'

const Tools = () => {
  const data = toolsData.tools.nodes
  const name = 'tools'
  const id = 1
  const toolboxFilterEnabled = useAppStore((s) => s.toolboxFilterEnabled)

  const [open, setOpen] = useState(false)
  const activity = useAppStore((s) => s.activity)

  const content =
    strings.activity.find((activity) => activity.name === name) || null

  if (content === null) {
    console.warn(`No content found for activity "${name}"`)
  }

  const showToolsOnly = useAppStore((s) => s.showToolsOnly)
  const getActiveToolIDs = useAppStore((state) => state.getActiveToolIDs)
  const yourToolsEnabled = useAppStore((s) => s.yourToolsEnabled)

  const activeIDs = getActiveToolIDs()
  const positiveIDsSet = useMemo(() => new Set(activeIDs), [activeIDs])

  // Memoize the final carouselData
  const carouselData = useMemo(() => {
    const filteredData = data.filter((obj) => activeIDs.includes(obj.id))
    return showToolsOnly ? filteredData : data
  }, [showToolsOnly, activeIDs, data])

  const setActivity = useAppStore((s) => s.setActivity)
  const setAcronymID = useAppStore((s) => s.setAcronymID)
  const setIsModal = useAppStore((s) => s.setIsModal)
  // const isModal = useAppStore((s) => s.isModal)
  useEffect(() => {
    open && setIsModal(activitiesById[id]?.modal)
  }, [open, setIsModal, id, activitiesById])

  useEffect(() => {
    setOpen(activity === id)
  }, [activity])

  const handleClick = (id) => () => {
    setActivity(17)
    setAcronymID(id)
    // setShowAccCard(true)
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
    setActivity(-1)
  }

  // Render description content
  const descriptionContent = content?.description && (
    <div className='tools-description'>
      {content.description.map((html, i) => (
        <p key={i}>{parse(DOMPurify.sanitize(html))}</p>
      ))}
    </div>
  )

  return (open ? 
    <div className={'activity acronym-tools fixed' + (open ? ' show' : ' ')}>
      {toolboxFilterEnabled && <BadgeToolbox />}

      <section className='tools' id='the-tools'>
        <div className='tools-inner'>
          <CloseBtn onClick={handleClose} />
          <header>
            <h2>{parse(DOMPurify.sanitize(content?.title))}</h2>
            <div className='intro'>
              {parse(DOMPurify.sanitize(content?.introduction))}
            </div>
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
    </div> : null
  )
}
Tools.propTypes = {
  handleMenuClick: PropTypes.func,
}
export default Tools
