import { useEffect, useMemo, useRef } from 'react'
import useAppStore from '@store/useAppStore'
import usePrivateStore from '@store/usePrivateStore'
import ButtonToolbox from '@buttons/toolbox/ButtonToolbox'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import HandymanIcon from '@mui/icons-material/Handyman'
import CloseBtn from '@buttons/close/CloseBtn'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import data from '@data/tools.js'
import videos from '@data/videosNew.js'

import IconCognition from '@icons/IconCognition'
import IconVideoLibrary from '@icons/IconVideoLibrary'
import Skeleton from '@mui/material/Skeleton'
import { extractYouTubeId } from '@js/utils.js'

import './acronymExplained.scss'

// console.log('data ', data)

const videosByDatabaseID = videos?.data?.videos?.nodes?.reduce((obj, video) => {
  obj[video.databaseId] = video
  return obj
}, {})

function getAccData(id) {
  return data.tools.nodes.find((acc) => acc.id === id)
}
const TITLE_MAX_CHARS = 12

const AcronymExplained = () => {
  const name = 'acronym-explained'
  const acronymID = useAppStore((s) => s.acronymID)
  const userToolIDs = usePrivateStore((s) => s.userToolIDs)
  const yourToolsEnabled = usePrivateStore((s) => s.yourToolsEnabled)
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
  const titleBare = acronymData?.title?.replaceAll('.', '')
  const titleLength = titleBare.length || 0

  return (
    <section className={`activity activity-${name} `}>
      <div className={`inner ${name}__inner`}>
        <div className={`header ${name}__header`}>
          <div
            className={`title cont ${name}__title-cont` + (titleLength < TITLE_MAX_CHARS ? '' : ' long')}
            key='title-acc'>
            {acronymData && isAcronym ? (
              acronymData?.title.split('.').map(
                (letter, index) =>
                  letter && (
                    <div className={`active ${name}__title-letter`} key={index} data-content={letter}>
                      {letter}
                    </div>
                  ),
              )
            ) : (
              <div className={`${name}__title-full`}>
                {acronymData?.title && parse(DOMPurify.sanitize(acronymData?.title))}
              </div>
            )}
          </div>
          <CloseBtn onClick={handleClose} />

          <div className={`toolbox-label ${name}__toolbox-label` + (isUserTool && yourToolsEnabled ? ' active' : '')}>
            <HandymanIcon className='icon' />
            <div>In toolbox</div>
          </div>
        </div>
        <section className={`AccContent ${name}__content`} id='AccContent' ref={contentRef}>
          <div className={`AccGroup ${name}__group`}>
            <div className={`AccExplanation ${name}__explanation`}>
              {acronymData?.toolFieldGroup ? (
                parse(DOMPurify.sanitize(acronymData.toolFieldGroup.description))
              ) : (
                <Skeleton animation='wave' />
              )}
            </div>

            {acronymData?.toolFieldGroup?.isAcronym &&
              acronymData?.toolFieldGroup.letters.map((acronym, index) => (
                <div key={'acronymn-' + index} className={`AccDetails ${name}__word-wrap`}>
                  <div className={`Acc-word ${name}__word`} data-len={acronym?.meaning?.length} key={'m-' + index}>
                    {acronym?.meaning}
                  </div>

                  <div key={'d-' + index} className={`Acc-definition ${name}__word-context`}>
                    {acronym?.definition && parse(DOMPurify.sanitize(acronym?.definition))}
                  </div>
                </div>
              ))}
          </div>

          {acronymData?.toolFieldGroup?.scenariosField?.nodes?.length > 0 &&
            acronymData?.toolFieldGroup?.scenariosField?.nodes[0].scenariosFieldGroup && (
              <div className={`scenarios ${name}__scenarios`}>
                <div className={`title ${name}__scenarios-title`}>Scenarios</div>
                <div className={`scenarios-inner ${name}__scenarios-inner`}>
                  {acronymData?.toolFieldGroup?.scenariosField?.nodes?.map((scenario, index) => (
                    <div className={`scenario ${name}__scenario`} key={`scenario-${index}`}>
                      <div className={`title ${name}__scenario-title`}>{scenario.title}</div>
                      {scenario.scenariosFieldGroup?.description && (
                        <div className={`content ${name}__scenario-content`}>
                          {parse(DOMPurify.sanitize(scenario.scenariosFieldGroup?.description))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {acronymData?.toolFieldGroup?.videosField?.nodes.length > 0 && (
            <div className={`videos ${name}__videos`} id='videos'>
              {acronymData?.toolFieldGroup?.videosField?.nodes.map((linkedVideo, index) => {
                const video = videosByDatabaseID[linkedVideo.id]

                return (
                  <div className={`video ${name}__video`} key={'video-' + index}>
                    <div className={`title ${name}__video-title`}>
                      <div>{video?.title && parse(DOMPurify.sanitize(video?.title))}</div>
                      {video?.videosFieldGroup?.duration && (
                        <div className={`duration ${name}__video-duration`}>
                          {video.videosFieldGroup?.duration?.hours && (
                            <div className={`hours ${name}__video-hours`}>
                              {video.videosFieldGroup?.duration?.hours}
                            </div>
                          )}
                          {video.videosFieldGroup?.duration?.minutes && (
                            <div className={`mins ${name}__video-mins`}>
                              {video.videosFieldGroup?.duration?.minutes}
                            </div>
                          )}
                          {video.videosFieldGroup?.duration?.seconds && (
                            <div className={`secs ${name}__video-seconds`}>
                              {video.videosFieldGroup?.duration?.seconds < 10
                                ? '0' + video.videosFieldGroup?.duration?.seconds
                                : video.videosFieldGroup?.duration?.seconds}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className={`player ${name}__video-player`}>
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
                      <div className={`description ${name}__video-description`}>
                        {parse(DOMPurify.sanitize(video.videosFieldGroup?.description))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>

        <div className={`footer acronym-card-footer ${name}__actions`}>
          <ButtonToolbox id={acronymData?.id} />
          {acronymData?.toolFieldGroup?.videosField?.nodes.length > 0 && (
            <button onClick={smoothScrollTo} className={`btn tool-explained__btn video ${name}__btn`}>
              <IconVideoLibrary />
              <div>Info</div>
            </button>
          )}
          {acronymData?.toolFieldGroup?.videosField?.nodes.length > 0 && (
            <button onClick={smoothToAccronym} className={`btn tool-explained__btn ${name}__btn top`}>
              <IconCognition />
              <div>Video</div>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

AcronymExplained.displayName = 'AcronymExplained'

export default AcronymExplained
