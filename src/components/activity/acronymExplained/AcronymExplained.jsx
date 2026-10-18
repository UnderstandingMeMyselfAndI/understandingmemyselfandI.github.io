import { useEffect, useMemo, useRef } from 'react'
import useAppStore from '@store/useAppStore'
import ButtonToolbox from '@buttons/toolbox/ButtonToolbox'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import HandymanIcon from '@mui/icons-material/Handyman'
import CloseBtn from '@buttons/close/CloseBtn'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import data from '@data/tools.js'
import videos from '@data/videosNew.js'
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined'
import HdrAutoOutlinedIcon from '@mui/icons-material/HdrAutoOutlined'
import Skeleton from '@mui/material/Skeleton'
import { extractYouTubeId } from '@js/utils.js'

import './acronymExplained.scss'

const videosByDatabaseID = videos?.data?.videos?.nodes?.reduce((obj, video) => {
  obj[video.databaseId] = video
  return obj
}, {})

function getAccData(id) {
  return data.tools.nodes.find((acc) => acc.id === id)
}

const AcronymExplained = () => {
  const acronymID = useAppStore((s) => s.acronymID)
  const userToolIDs = useAppStore((s) => s.userToolIDs)
  const yourToolsEnabled = useAppStore((s) => s.yourToolsEnabled)
  const setShowAccCard = useAppStore((s) => s.setShowAccCard)
  const setActivity = useAppStore((s) => s.setActivity)

  // Derived, not stored. No setState-in-effect, no cascading render.
  const acronymData = useMemo(() => getAccData(acronymID), [acronymID])
  const isUserTool = userToolIDs.includes(acronymID)

  const contentRef = useRef(null)

  // Reset scroll when the tool changes. This is a DOM side-effect, not state,
  // so it legitimately belongs in an effect.
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0
  }, [acronymID])

  const handleClose = () => {
    setShowAccCard(false)
    setActivity(1)
  }

  const smoothScrollTo = (e) => {
    e.preventDefault()
    const element = document.getElementById('videos')
    element?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  const smoothToAccronym = (e) => {
    e.preventDefault()
    contentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const isAcronym = acronymData?.toolFieldGroup?.isAcronym
  const titleLength = acronymData?.title.length

  return (
    <section className='activity acronym-explained-activity fixed show'>
      <div className='inner'>
        <div className='header'>
          <div className={'title cont' + (titleLength >= 14 ? ' long' : '')}>
            {acronymData && isAcronym ? (
              acronymData?.title.split('.').map(
                (letter, index) =>
                  letter && (
                    <div className='active' key={index} data-content={letter}>
                      {letter}
                    </div>
                  ),
              )
            ) : (
              <div>{acronymData?.title && parse(DOMPurify.sanitize(acronymData?.title))}</div>
            )}
          </div>
          <CloseBtn onClick={handleClose} />
          {isUserTool && yourToolsEnabled && (
            <div className='toolbox-label'>
              <HandymanIcon className='icon' />
              <div>In toolbox</div>
            </div>
          )}
        </div>
        <section className='AccContent' id='AccContent' ref={contentRef}>
          <div className='AccGroup'>
            <div className='AccExplanation'>
              {acronymData?.toolFieldGroup ? (
                parse(DOMPurify.sanitize(acronymData.toolFieldGroup.description))
              ) : (
                <Skeleton animation='wave' />
              )}
            </div>

            {acronymData?.toolFieldGroup?.isAcronym &&
              acronymData?.toolFieldGroup.letters.map((acronym, index) => (
                <div key={'acronymn-' + index} className='AccDetails'>
                  <div className='Acc-letter-group' key={'t-' + index}>
                    <div className='Acc-word' data-len={acronym?.meaning?.length} key={'m-' + index}>
                      {acronym?.meaning}
                    </div>
                  </div>
                  <div key={'d-' + index} className='Acc-definition'>
                    {acronym?.definition && parse(DOMPurify.sanitize(acronym?.definition))}
                  </div>
                </div>
              ))}
          </div>

          {acronymData?.toolFieldGroup?.scenariosField?.nodes?.length > 0 &&
            acronymData?.toolFieldGroup?.scenariosField?.nodes[0].scenariosFieldGroup && (
              <div className='scenarios'>
                <div className='title'>Scenarios</div>
                <div className='scenarios-inner'>
                  {acronymData?.toolFieldGroup?.scenariosField?.nodes?.map((scenario, index) => (
                    <div className='scenario' key={`scenario-${index}`}>
                      <div className='title'>{scenario.title}</div>
                      {scenario.scenariosFieldGroup?.description && (
                        <div className='content'>
                          {parse(DOMPurify.sanitize(scenario.scenariosFieldGroup?.description))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {acronymData?.toolFieldGroup?.videosField?.nodes.length > 0 && (
            <div className='videos' id='videos'>
              {acronymData?.toolFieldGroup?.videosField?.nodes.map((linkedVideo, index) => {
                const video = videosByDatabaseID[linkedVideo.id]

                return (
                  <div className='video' key={'video-' + index}>
                    <div className='title'>
                      <div>{video?.title && parse(DOMPurify.sanitize(video?.title))}</div>
                      {video?.videosFieldGroup?.duration && (
                        <div className='duration'>
                          {video.videosFieldGroup?.duration?.hours && (
                            <div className='hours'>{video.videosFieldGroup?.duration?.hours}</div>
                          )}
                          {video.videosFieldGroup?.duration?.minutes && (
                            <div className='mins'>{video.videosFieldGroup?.duration?.minutes}</div>
                          )}
                          {video.videosFieldGroup?.duration?.seconds && (
                            <div className='secs'>
                              {video.videosFieldGroup?.duration?.seconds < 10
                                ? '0' + video.videosFieldGroup?.duration?.seconds
                                : video.videosFieldGroup?.duration?.seconds}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className='player'>
                      {video ? (
                        <LiteYouTubeEmbed
                          id={extractYouTubeId(video.videosFieldGroup.url)}
                          title={video.title}
                          poster='hqdefault'
                        />
                      ) : (
                        <Skeleton animation='wave' className='video-skeleton' />
                      )}
                    </div>
                    {video?.videosFieldGroup?.description && (
                      <div className='description'>
                        {parse(DOMPurify.sanitize(video.videosFieldGroup?.description))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>

        <div className='footer acronym-card-footer'>
          <ButtonToolbox id={acronymData?.id} />
          {acronymData?.toolFieldGroup?.videosField?.nodes.length > 0 && (
            <button onClick={smoothScrollTo} className='btn video'>
              <OndemandVideoOutlinedIcon />
            </button>
          )}
          {acronymData?.toolFieldGroup?.videosField?.nodes.length > 0 && (
            <button onClick={smoothToAccronym} className='btn top'>
              <HdrAutoOutlinedIcon />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

AcronymExplained.displayName = 'AcronymExplained'

export default AcronymExplained
