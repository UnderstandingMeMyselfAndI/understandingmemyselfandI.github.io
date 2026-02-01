import { useState, useEffect, useRef, useCallback } from 'react'
import SearchField from '@/components/ui/search/SearchField'
import Dialog from '@/components/ui/dialog/Dialog'
import lingo from '@/data/lingo.js'
import { sanitizeStringForUrl, setBrowserHistory, isEmpty } from '@/js/utils.js'
import { strings } from '@/data/config'
// import UnfoldMoreDoubleIcon from '@mui/icons-material/UnfoldMoreDouble';
import './styles.scss'
import useAppStore from '@/store/useAppStore'
import { set } from 'idb-keyval'
const Lingo = () => {
  const [showDialog, setShowDialog] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [content, setContent] = useState([])
  const gae = useAppStore((s) => s.gae)
  const [open, setOpen] = useState(false)
  const initialHeight = 310
  const [elHeight, setElHeight] = useState(initialHeight)
  const [elHeightExpanded, setElExpandedHeight] = useState(initialHeight)
  const activity = useAppStore((s) => s.activity)

  const listRef = useRef(null)

  useEffect(() => {
    setOpen(activity === -1)
  }, [activity])

  const logGAEvent = useCallback(
    (name, params = null) => {
      if (!gae) {
        console.log('Google analytics not enabled')
        return
      }
      console.trace('@@@@@@@@@@@@@@@@@@@@@@logGAEvent called')
      if (typeof window.gtag === 'function' && !isEmpty(name)) {
        window.gtag('event', name, params)
        console.log('>>>>>>>>>>>>>>>>>>log ga event ', name, params)
      } else {
        console.warn('gtag not available – event not sent:', name)
      }
    },
    [gae],
  )
  const setPhrase = useAppStore((state) => state.setPhrase)
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
    if (!showDialog) {
      const appURL = `${window.location.protocol}//${window.location.host}`

      setBrowserHistory(
        `${appURL}/lingo-phrases/`,
        `${strings.app.appName} Lingo & Phrases`,
      )
    }
  }, [showDialog])

  const handleClick = (id) => {
    const search = getContent(id)
    if (search?.lingoFieldGroup?.description) {
      setContent(search)
      setShowDialog(true)
    }
    const phraseObj = lingo.find((item) => item.id === id)
    const appURL = `${window.location.protocol}//${window.location.host}`

    setBrowserHistory(
      `${appURL}/lingo-phrases/${sanitizeStringForUrl(phraseObj?.title.toLowerCase())}`,
      `${strings.app.appName} Phrase: - ${phraseObj.title}`,
    )
    const event_name =
      sanitizeStringForUrl(phraseObj?.title.toLowerCase()) + '_phrase_viewed'
    logGAEvent(event_name)
  }

  const handleExpandClick = () => {
    const node = document.getElementById('lingo')
    node.scrollIntoView({ behavior: 'smooth' })
    setShowAll((prevState) => !prevState)
  }

  useEffect(() => {
    if (content?.title && content.id) {
      setPhrase([content.id, content?.title])

      const event_name = sanitizeStringForUrl(content?.title) + '_phrase_viewed'

      if (gae && window.gtag) {
        logGAEvent(event_name)
      } else {
        console.log('GA not enabled')
      }
    }
  }, [content, setPhrase, gae])

  const listHeight = showAll ? elHeightExpanded : elHeight

  return (
    <section
      id='lingo'
      className={'activity activity-search-lingo' + (open ? ' show' : ' hide')}>
      <div className='search-lingo-wrap'>
        <Dialog
          show={showDialog}
          title={content?.title}
          instruction={content?.lingoFieldGroup?.description}
          confirmLabel='Close'
          onConfirm={() => setShowDialog(false)}
          showCancel={false}
          onClick={() => setShowDialog(false)}
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
