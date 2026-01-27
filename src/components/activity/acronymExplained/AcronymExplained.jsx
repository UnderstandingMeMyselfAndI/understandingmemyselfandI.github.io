import { useState, useEffect, useRef } from 'react'
import useAppStore from '@/store/useAppStore'
import ButtonToolbox from 'buttons/toolbox/ButtonToolbox'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import HandymanIcon from '@mui/icons-material/Handyman'
import CloseBtn from 'buttons/close/CloseBtn'
import parse from 'html-react-parser'
import data from '@/data/tools.js'
import videos from '@/data/videosNew.js'
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined'
import HdrAutoOutlinedIcon from '@mui/icons-material/HdrAutoOutlined'
import Skeleton from '@mui/material/Skeleton'
import { extractYouTubeId } from '@/js/utils.js'
import './styles.scss'
import { sanitizeStringForUrl } from '@/js/utils.js'
// TODO [x]: Show hide favourites
// TODO [x]: Add videos

// TODO [ ]: Implement sharing
function getAccData(id) {
  return data.tools.nodes.find((acc) => acc.id === id)
}

const AcronymExplained = () => {
  // TODO: Intergrate data from CMS
  const [open, setOpen] = useState(false)
  const [acronymData, setAcronymData] = useState(null)
  const getActiveToolIDs = useAppStore((state) => state.getActiveToolIDs)
  const userToolIDs = useAppStore((state) => state.userToolIDs)
  const yourToolsEnabled = useAppStore((state) => state.yourToolsEnabled)
  const acronymID = useAppStore((s) => s.acronymID)
  const activity = useAppStore((s) => s.activity)
  const showAccCard = useAppStore((s) => s.showAccCard)
  const setShowAccCard = useAppStore((s) => s.setShowAccCard)
  const setActivity = useAppStore((s) => s.setActivity)
  const [isUserTool, setIsUserTool] = useState(userToolIDs.includes(acronymID))

  const gae = useAppStore((s) => s.gae) // Google analytics enabled

  useEffect(() => {
    setIsUserTool(userToolIDs.includes(acronymID))
  }, [getActiveToolIDs, setIsUserTool, acronymID, userToolIDs])

  const contentRef = useRef(null)
  useEffect(() => {
    const acronymData = getAccData(acronymID)
    setAcronymData(acronymData)

    contentRef.current.scrollTop = 0
    // TODO[x]: Ga event names need to be changed acronym_viewed - > tool_viewed_[name of acronym]
    const event_name = 'tool_viewed_' + sanitizeStringForUrl(acronymData?.title)
    if (gae && window.gtag) {
      window.gtag('event', event_name ? event_name : 'tool_viewed', {
        acronym_name: acronymData?.title,
        app_name: 'Ummi',
      })
    }
  }, [acronymID, gae])

  // useEffect(() => {
  //   setOpen(showAccCard)
  // }, [showAccCard])

  useEffect(() => {
    setOpen(activity == 17)
  }, [activity])

  const handleClose = () => {
    setShowAccCard(false)
    setActivity(1)
  }

  const smoothScrollTo = (e) => {
    e.preventDefault()
    const element = document.getElementById('videos')
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth', // smooth scroll
    })
  }
  const smoothToAccronym = (e) => {
    e.preventDefault()
    const element = document.getElementById('AccContent')
    element.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // smooth scroll
    })
  }

  return (
    <section
      className={
        'activity acronym-explained-activity fixed' + (open ? ' show' : '')
      }
      key='acronym-card'
    >
      <div className='inner'>
        <div className='header'>
          <div className='title cont'>
            {acronymData ? (
              acronymData?.title.split('.').map(
                (letter, index) =>
                  letter && (
                    <div className='active' key={index} data-content={letter}>
                      {letter}
                    </div>
                  ),
              )
            ) : (
              <Skeleton animation='wave' />
            )}
          </div>
          {isUserTool && yourToolsEnabled && <HandymanIcon className='icon' />}
        </div>
        <section className='AccContent' id='AccContent' ref={contentRef}>
          <div className='AccGroup'>
            <div className='AccExplanation'>
              {acronymData?.toolFieldGroup ? (
                parse(acronymData.toolFieldGroup.description)
              ) : (
                <Skeleton animation='wave' />
              )}
            </div>

            {acronymData?.toolFieldGroup.letters.map((acronym, index) => (
              <div key={'acronymn-' + index} className='AccDetails'>
                <div className='Acc-letter-group' key={'t-' + index}>
                  <div
                    className='Acc-word'
                    data-len={acronym.meaning.length}
                    key={'m-' + index}
                  >
                    {acronym.meaning}
                  </div>
                </div>
                <div key={'d-' + index} className='Acc-definition'>
                  {parse(acronym.definition)}
                </div>
              </div>
            ))}
          </div>
          {acronymData?.toolFieldGroup?.scenariosField?.nodes?.length > 0 &&
            acronymData?.toolFieldGroup?.scenariosField?.nodes[0]
              .scenariosFieldGroup && (
              <div className='scenarios'>
                <div className='title'>Scenarios</div>
                <div className='scenarios-inner'>
                  {acronymData?.toolFieldGroup?.scenariosField?.nodes?.map(
                    (scenario, index) => (
                      <div className='scenario' key={`scenario-${index}`}>
                        <div className='title'>{scenario.title}</div>
                        {scenario.scenariosFieldGroup?.description && (
                          <div className='content'>
                            {parse(scenario.scenariosFieldGroup?.description)}
                          </div>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

          {acronymData?.toolFieldGroup?.videosField?.nodes.length > 0 && (
            <div className='videos' id='videos' key='videos'>
              {acronymData?.toolFieldGroup?.videosField?.nodes.map(
                (linkedVideo, index) => {
                  const video = videos.data.videos.nodes.find(
                    (v) => v.id === linkedVideo.id,
                  )
                  return (
                    <div className='video' key={'video-' + index}>
                      <div className='title'>{parse(video.title)}</div>
                      {video.videosFieldGroup?.duration && (
                        <div className='duration'>
                          {video.videosFieldGroup?.duration?.hours && (
                            <div className='hours'>
                              {video.videosFieldGroup?.duration?.hours}
                            </div>
                          )}
                          {video.videosFieldGroup?.duration?.minutes && (
                            <div className='mins'>
                              {video.videosFieldGroup?.duration?.minutes}
                            </div>
                          )}
                          {video.videosFieldGroup?.duration?.seconds && (
                            <div className='secs'>
                              {video.videosFieldGroup?.duration?.seconds < 10
                                ? '0' +
                                  video.videosFieldGroup?.duration?.seconds
                                : video.videosFieldGroup?.duration?.seconds}
                            </div>
                          )}
                        </div>
                      )}

                      <div className='player'>
                        {video ? (
                          <LiteYouTubeEmbed
                            id={extractYouTubeId(video.videosFieldGroup.url)}
                            title={video.title}
                            key={'video-' + index}
                            poster='hqdefault'
                          />
                        ) : (
                          <Skeleton
                            animation='wave'
                            className='video-skeleton'
                          />
                        )}
                      </div>
                      {video.videosFieldGroup?.description && (
                        <div className='description'>
                          {parse(video.videosFieldGroup?.description)}
                        </div>
                      )}
                    </div>
                  )
                },
              )}
            </div>
          )}
        </section>
        <div className='footer acronym-card-footer' key='acronym-card-footer'>
          <ButtonToolbox
            id={acronymData?.id}
            key={`toolbox-btn-${acronymData?.id}`}
          />
          {acronymData?.toolFieldGroup?.videosField?.nodes.length > 0 && (
            <button
              onClick={smoothScrollTo}
              className='btn video'
              key={`video-btn-${acronymData?.id}`}
            >
              <OndemandVideoOutlinedIcon
                key={`video-icon-${acronymData?.id}`}
              />
            </button>
          )}
          {acronymData?.toolFieldGroup?.videosField?.nodes.length > 0 && (
            <button
              onClick={smoothToAccronym}
              className='btn top'
              key={`goto-top-btn-${acronymData?.id}`}
            >
              <HdrAutoOutlinedIcon key={`goto-top-icon-${acronymData?.id}`} />
            </button>
          )}

          <div className='btn close' onClick={handleClose}>
            <CloseBtn width={30} thickness={3} />
          </div>
        </div>
      </div>
    </section>
  )
}
AcronymExplained.displayName = 'AcronymExplained'

export default AcronymExplained
