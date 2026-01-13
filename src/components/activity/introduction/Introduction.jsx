import { useEffect, useState, useRef } from 'react';
import useAppStore from '@/store/useAppStore';
import parse from 'html-react-parser';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { activities, strings } from '@/data/config';
import gsap from 'gsap'; // <-- import GSAP
import { useGSAP } from '@gsap/react'; // <-- import the hook from our React package
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies
gsap.registerPlugin(ScrollTrigger);
import '@/utils/IsMobile.js';
import './styles.scss';

const Introduction = () => {
  const name = 'introduction';
  const [open, setOpen] = useState(false);
  const activity = useAppStore((s) => s.activity);
  const activityID = activities.find((activity) =>
    activity.url === name ? activity.id : null,
  );
  const ref = useRef();
  const content =
    strings.activity.find((activity) => activity.name === name) || null;
  if (content === null) {
    console.warn(`No content found for activity "${name}"`);
  }

  const isInstalled = useAppStore((state) => state.isInstalled);
  const vc = useAppStore((state) => state.vc); // visit count

  useEffect(() => {
    setOpen(activity === -1);
  }, [activity]);

  function getRand(max) {
    return Math.floor(Math.random() * (max - 1 + 1)) + 1;
  }

  useGSAP(
    () => {
      const sections = gsap.utils.toArray('.point');
      sections.forEach((section, i) => {
        let tl = gsap.timeline({
          // yes, we can add it to an entire timeline!
          scrollTrigger: {
            trigger: section, // '.point',
            markers: false,
            id: 'section' + i,
            pin: false, // pin the trigger element while active
            start: 'top+=15% bottom-=20%', // when the top of the trigger hits the top of the viewport
            end: 'bottom-=15% top+=35%', // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
            toggleActions: 'play pause reverse reverse',
            snap: {
              snapTo: 'labels', // snap to the closest label in the timeline
              duration: { min: 2.5, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
              delay: 0.5, // wait 0.2 seconds from the last scroll event before doing the snapping
              ease: 'power4.inOut', // the ease of the snap animation ("power3" by default)
            },
          },
        });
        tl.addLabel('start')

          .from(section, { duration: 1, autoAlpha: 0, y: 150 })
          .addLabel('show')
          .to(section, { autoAlpha: 1, y: 0 })
          .addLabel('leave')
          .to(section, { duration: 1, autoAlpha: 0, y: -150 })
          .addLabel('end');
      });
      sections.forEach((section, i) => {
        const icon = section.querySelector('.icon');
        let tl2 = gsap.timeline({
          // yes, we can add it to an entire timeline!
          scrollTrigger: {
            trigger: section, // '.point',
            markers: false,
            id: 'section' + i,
            pin: false, // pin the trigger element while active
            start: 'top+=10% bottom-=15%', // when the top of the trigger hits the top of the viewport
            end: 'bottom top+=5%', // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
            toggleActions: 'play pause reverse reverse',
            snap: {
              snapTo: 'labels', // snap to the closest label in the timeline
              duration: { min: 2.5, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
              delay: 0.5, // wait 0.2 seconds from the last scroll event before doing the snapping
              ease: 'power4.inOut', // the ease of the snap animation ("power3" by default)
            },
          },
        });
        const blur = 150;
        tl2
          .addLabel('start')

          .from(icon, {
            duration: 0.5,
            scale: 0.25,
            webkitFilter: `blur(${blur}px)`,
            filter: `blur(${blur}px)`,
          })
          .addLabel('show')
          .to(icon, {
            scale: 1,
            webkitFilter: 'blur(0px)',
            filter: 'blur(0px)',
          })
          .addLabel('leave')
          .to(icon, {
            duration: 1,
            scale: 0.25,
            webkitFilter: `blur(${blur}px)`,
            filter: `blur(${blur}px)`,
          })
          .addLabel('end');
      });
    },
    { scope: ref, revertOnUpdate: true },
  );

  return open ? (
    <div className={'activity' + (open ? ' show' : ' hide')}>
      <section className='intro' id='intro'>
        <div className='i1'>
          <h2>
            {(!isInstalled || (isInstalled && vc < 3)) && (
              <u>{content.title}</u>
            )}

            {isInstalled && vc >= 3 && (
              <u>
                {parse(
                  content?.returning?.content?.titles[
                    getRand(content?.returning?.content?.titles?.length - 1)
                  ],
                )}
              </u>
            )}
          </h2>
          {isInstalled &&
            vc > 20 &&
            vc < 33 && // if app is installed show different content
            content?.installed.content?.map((cnt, i) => {
              return (
                <div
                  key={`intro-${i}`}
                  className={'sub subsection installed sec-' + i}
                >
                  <div className='title '>
                    <h2>{parse(cnt?.title)}</h2>
                  </div>
                  {cnt?.content?.map((para, k) => {
                    return (
                      <div className='' key={'p-' + k}>
                        {i === 1 && <DoneOutlineIcon className='icon' />}
                        <p key={k}>{parse(para)}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}

          {isInstalled && vc >= 20 && (
            <div key={`intro`} className={'sub subsection sec-'}>
              <div className=' returning'>
                {parse(
                  content?.returning?.content?.contents[
                    getRand(content?.returning?.content?.contents?.length - 1)
                  ],
                )}
              </div>
            </div>
          )}

          {(!isInstalled || (isInstalled && vc < 20)) &&
            content?.content?.map((cnt, i) => {
              return (
                <div
                  key={`intro-${i}`}
                  className={'sub notinstalled subsection sec-' + i}
                  ref={i === 1 ? ref : null}
                >
                  <div className='title '>
                    <h2>{parse(cnt?.title)}</h2>
                  </div>
                  {cnt?.content?.map((para, k) => {
                    return (
                      <div className={'point' + ' ' + ' p-' + k} key={'p-' + k}>
                        {i === 1 && <DoneOutlineIcon className='icon' />}
                        <p key={k}>{parse(para)}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </section>
    </div>
  ) : (
    <></>
  );
};

export default Introduction;
