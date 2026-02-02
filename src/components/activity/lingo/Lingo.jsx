import { useState, useEffect, useRef, useCallback } from 'react'
import SearchField from '@/components/ui/search/SearchField'
import Dialog from '@/components/ui/dialog/Dialog'
import lingo from '@/data/lingo.js'
import { useOnInView } from 'react-intersection-observer'

import { sanitizeStringForUrl, setBrowserHistory, isEmpty } from '@/js/utils.js'
import { strings } from '@/data/config'
// import UnfoldMoreDoubleIcon from '@mui/icons-material/UnfoldMoreDouble';
import './styles.scss'
import useAppStore from '@/store/useAppStore'
import { set } from 'idb-keyval'
import { activities } from '@/data/config'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})
const phrasesByURL = lingo.reduce((acc, phrase) => {
  acc[sanitizeStringForUrl(phrase.title)] = phrase
  return acc
}, {})
const Lingo = () => {
  const name = 'lingo'
  const id = 13
  const [showDialog, setShowDialog] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [content, setContent] = useState([])
  const gae = useAppStore((s) => s.gae)
  const [open, setOpen] = useState(false)
  const initialHeight = 310
  const [elHeight, setElHeight] = useState(initialHeight)
  const [elHeightExpanded, setElExpandedHeight] = useState(initialHeight)
  const activity = useAppStore((s) => s.activity)
  const setActivity = useAppStore((s) => s.setActivity)
  // const setPhraseID = useAppStore((s) => s.setPhraseID)
  const setPhrase = useAppStore((state) => state.setPhrase)
  const phrase = useAppStore((state) => state.phrase)
  const isModal = useAppStore((state) => state.isModal)
  const setIsModal = useAppStore((state) => state.setIsModal)
  const listRef = useRef(null)

  const activityObj = activitiesById[id]

  useEffect(() => {
    setOpen(activity === id || !isModal)
  }, [activity])

  useEffect(() => {
    open && setIsModal(activitiesById[id].modal)
  }, [open])

  function getContent(id) {
    if (!id) return

    return lingo.find((item) => {
      if (item.id === id) return item.lingoFieldGroup
    })
  }
  function getElementHeight(node) {
    return node ? node.getBoundingClientRect().height : 0
  }

  useEffect(() => {
    if (!showAll && listRef.current) {
      if (getElementHeight(listRef.current) !== 0) {
        const interval = setInterval(() => {
          const height = getElementHeight(listRef.current)
          if (height !== 0) {
            clearInterval(interval)
            setElExpandedHeight(height + 140)
          }
        }, 300)
      }
    }
  }, [listRef, showAll, elHeightExpanded, initialHeight])

  useEffect(() => {
    if (isEmpty(phrase)) return
    phrasesByURL[sanitizeStringForUrl(phrase)] &&
      setContent(phrasesByURL[sanitizeStringForUrl(phrase)])
    setShowDialog(true)
  }, [phrase])

  const handleClick = (id) => {
    const search = getContent(id)
    if (search?.lingoFieldGroup?.description) {
      setContent(search)
      setPhrase(search.title)
    }
    setIsFirstLoad(false)
  }

  const handleExpandClick = () => {
    const node = document.getElementById('lingo')
    node.scrollIntoView({ behavior: 'smooth' })
    setShowAll((prevState) => !prevState)
  }
  const handleDialogClick = () => {
    setActivity(id)
    setShowDialog(false)

    setBrowserHistory(
      `${window.location.protocol}/${window.location.host}/${sanitizeStringForUrl(activityObj.url)}`,
      activityObj.name,
    )
  }

  const inViewRef = useOnInView(
    (inView) => {
      if (!inView) {
        setActivity(-1)
        setIsModal(false)
      }
      console.log('inView', inView)
    },
    {
      threshold: 0.1,
      rootMargin: '0% 0% 0% 0%',
    },
  )

  const listHeight = showAll ? elHeightExpanded : elHeight

  return (
    <section
      id='lingo'
      className={'activity activity-search-lingo' + (open ? ' show' : ' hide')}
      ref={inViewRef}>
      <div className='search-lingo-wrap'>
        <Dialog
          show={showDialog}
          title={content?.title}
          instruction={content?.lingoFieldGroup?.description}
          confirmLabel='Close'
          onConfirm={handleDialogClick}
          showCancel={false}
        />
        <h3>Lingo &amp; Phrases</h3>
        <div
          className={
            'lingo-list-wrapper' +
            (showAll ? ' expand' : '  collapse') +
            (showAll ? ' elHeightExpanded' : ' elHeight')
          }
          style={{ height: listHeight + 'px' }}>
          <SearchField handleClick={handleClick} ref={listRef} />
        </div>
        <div
          className={'lingo-list-btn' + (showAll ? ' expand' : ' collapse')}
          onClick={handleExpandClick}>
          {showAll ? 'HIDE LINGO' : 'SHOW ALL LINGO'}
        </div>
      </div>
    </section>
  )
}

export default Lingo
