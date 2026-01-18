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
  const [open, setOpen] = useState(true);
  const activity = useAppStore((s) => s.activity);
  // const activityID = activities.find((activity) =>
  //   activity.url === name ? activity.id : null,
  // );
  const sectionRef = useRef();
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
      const points = gsap.utils.toArray('.point');

      points !== null &&
        points.forEach((point,i) => {
          
          if(point !== null){

            gsap.timeline({scrollTrigger:{
              trigger: point,
              scrub:1.75,
              markers:true,
              id:"point-"+i,
              toggleActions: 'play reverse reverse reset ',
            }})
                 
            .to(point, {
              duration: 6, 
              autoAlpha:1,
              delay:2,
              ease:'power4.inOut',
            }) 
            .to(point, {
              duration: 2, 
              autoAlpha:1,
              ease:'power4.inOut',
            })
            .to(point, {
              duration: 3, 
              delay:0,
              autoAlpha:0,
              ease:'power4.inOut',
            })

            const box = point.querySelector('.tick-icon');
            gsap.timeline({scrollTrigger:{
                trigger: point,
                end: 'bottom center+=10%', 
                scrub:1.75,
                toggleActions: 'play reverse reverse reset ',
            }})
            .addLabel('start')           
              .to(box, {
                duration: 6, 
                scale:1,
                autoAlpha:0.25,
                ease:'power4.inOut',
                webkitFilter: `blur(0px)`,
                filter: `blur(0px)`,
              })              
          }
        });
    },
    { revertOnUpdate: true },
  );

  return (
    <section
    id='intro'
      className={'activity intro' + (open ? ' show' : ' hide')}
      
      ref={sectionRef}
    >
      <div className='introduction-inner'>
      <div className='inner'>
        <h1>
          {(!isInstalled || (isInstalled && vc < 3)) && <u>{content.title}</u>}

          {isInstalled && vc >= 3 && (
            <u>
              {parse(
                content?.returning?.content?.titles[
                  getRand(content?.returning?.content?.titles?.length - 1)
                ],
              )}
            </u>
          )}
        </h1>
        
        {isInstalled &&
          vc > 20 &&
          vc < 33 && // if app is installed show different content
          content?.installed.content?.map((cnt, i) => {
            return (
              <div
                key={`intro-${i}`}
                className={'sub subsection installed sec-' + i}
              >
                {cnt?.title && (
                  <div className='subsection-title'>
                    <h2>{parse(cnt?.title)}</h2>
                  </div>
                )}
                
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
                ref={i === 1 ? sectionRef : null}
              >
                {cnt?.title && (
                  <div className='subsection-title'>
                    <h2 className='title2'><u>{parse(cnt?.title)}</u></h2>
                  </div>
                )}
                {cnt?.content?.map((para, k) => {
                  return (
                    <div className={'point' + ' ' + ' p-' + k} key={'p-' + k}>
                      {i === 1 && <DoneOutlineIcon className='tick-icon icon' />}
                      <p key={k}>{parse(para)}</p>
                      
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
      </div>
    </section>
  );
};

export default Introduction;
