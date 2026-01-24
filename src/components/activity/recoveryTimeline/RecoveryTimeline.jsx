import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CloseBtn from '@/components/ui/buttons/close/CloseBtn';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import RecoveryDayCount from './RecoveryDayCount';
import { useGSAP } from '@gsap/react';
// import { debounce } from '@/js/utils.js';
import './styles.scss';
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    // Clear the previous timeout
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
const RecoveryTimeline = ({ data, config, onClose }) => {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

  const [timelineData, setTimelineData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [enableScrollEffects, setEnableScrollEffects] = useState(false);
  const [error, setError] = useState(null);
  const componentRef = useRef(null);
  const [groupMaxDays, setGroupMaxDays] = useState(1);
  const [currentDay, setCurrentDay] = useState(-1);
  const scrollContainerRef = useRef();
  const containerRef = useRef();
  // const layerOneRef = useRef(null);
  // const layerTwoRef = useRef(null);
  const scrollerRef = useRef();
  // const mainTimeline = useRef(null);
  const timePeriodRefs = useRef([]);
  const categoryRefs = useRef([[]]);

  const smoother = useRef();

  useEffect(() => {
    try {
      if (data) {
        setTimelineData(data);
        // console.log('data', data);
      }
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load timeline data.');
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading && timelineData && config) {
      setEnableScrollEffects(true);
    }
  }, [isLoading, timelineData, config, error]);

  const setGroup = (i) => {
    const groups = gsap.utils.toArray('.change-group-wrap');
    if (!groups[i]) return;
    const maxDays = parseInt(groups[i].getAttribute('data-day-range'));
    maxDays ? setGroupMaxDays(maxDays) : null;
  };

  const scrollContainer = document.querySelector('.box-scroller');
  scrollContainer?.addEventListener('scroll', () => {
    console.log('scrollTop ');
  });

  const calculateDay = () => {
    const computedStyle = window.getComputedStyle(scrollContainer);

    const transform = computedStyle.transform || computedStyle.webkitTransform;

    if (transform && transform !== 'none') {
      const matrix = transform.match(/matrix\(([^)]+)\)/);

      // Split the matrix values
      const values = matrix[1].split(',').map(Number);
      // // In matrix, the Y translation is at index 5 (0-based)

      const yTranslation = values[5];
      // // The scroll position (top) would be the negative of this value
      const scrollTop = -yTranslation;

      if (!scrollTop) return;

      console.log('scrollTop ', scrollTop);

      const pos =
        scrollTop / (scrollContainer.scrollHeight - window.innerHeight);
      const day = Math.ceil(groupMaxDays * pos);
      day !== currentDay && setCurrentDay(day);
      console.log('day', day, ' pos ', pos);
      // console.log(
      //   'scrollTop ',
      //   scrollTop,
      //   'scrollContainer.scrollHeight ',
      //   scrollContainer.scrollHeight,
      // );
    }
  };

  useGSAP(
    () => {
      if (!enableScrollEffects) return;

      ScrollSmoother.create({
        smooth: 0.2, // how long (in seconds) it takes to "catch up" to the native scroll position
        effects: true, // looks for data-speed and data-lag attributes on elements
        smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)

        onUpdate: () => {
          // debounce(calculateDay(), 750);
        },
      });

      /*************************************
       * Boxes for triggers
       ************************************/
      setTimeout(() => {
        const boxes = gsap.utils.toArray('.box');
        const changeItems = gsap.utils.toArray('.change-item');
        // console.log('changeItems ', changeItems);

        // changeItems.forEach((item, i) => {
        //   item.classList.add('entering');
        //   item.addEventListener('transitionend', function h() {
        //     item.classList.remove('entering');
        //     item.removeEventListener('transitionend', h);
        //   });
        // });

        boxes.forEach((box, i) => {
          const parent = box.parentNode;

          const endPos =
            (parent.offsetHeight / boxes.length) * (boxes.length - (i + 1));
          // console.log('changeItems[i].parentNode ', changeItems[i].parentNode);
          const tl = gsap
            .timeline({})
            .fromTo(
              changeItems[i],
              { autoAlpha: 0.5, y: '50dvh' },
              { autoAlpha: 1, y: 0, duration: 2 },
            )
            .to(changeItems[i], {
              autoAlpha: 0.5,
              y: '-50dvh',
              duration: 2,
              scrollTrigger: {
                trigger: box,
                scroller: '#smooth-wrapper',
                start: 'top bottom',
                end: () => `+=${endPos}px`,
                pinSpacing: false,
                pin: false,
                scrub: false,
                onEnter: () => (self) => {},
              },
            });
          // .to(changeItems[i], {
          //   autoAlpha: 0,
          //   y: '-100dvh',

          //   delay: 3,
          // });
        });
        /*************************************
         * Groups for pinning
         ************************************/

        const headerHeight =
          document.querySelector('.timeline-header').offsetHeight;

        const groups = gsap.utils.toArray('.change-group-wrap');

        groups.forEach((group, i) => {
          const spacer = group.querySelector('.change-category-spacer');
          const headerHeight = 80; //group.querySelector('h2');
          const sectionHeight = window.innerHeight - headerHeight;
          const changeItems = group.querySelectorAll('.change-item');
          spacer.style.height = `${sectionHeight * changeItems.length}px`;

          //   const contHeight =
          //     (window.innerHeight - headerHeight) * changeGroups.length;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: group,
              scroller: '#smooth-wrapper',
              start: `top top`,
              end: () => `+=${group.offsetHeight + window.innerHeight * 2}px`,
              pinSpacing: false,
              anticipatePin: true,
              pin: true,
              id: i,
              scrub: false,
              onEnter: () => {
                // setGroup(i);
              },
              onEnterBack: () => {
                // setGroup(i);
              },
            },
          });
        });
      });
    },
    {
      dependencies: [enableScrollEffects, groupMaxDays, currentDay],
      /* scope: scrollContainerRef,*/
    },
  );

  const addTimePeriodRef = (el) => {
    if (el && !timePeriodRefs.current.includes(el)) {
      timePeriodRefs.current.push(el);
    }
  };
  // Handle retry
  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    if (data) {
      setTimelineData(data);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className='timeline-loading'>Loading...</div>;
  }

  if (error) {
    return (
      <div className='timeline-error'>
        <p>{error}</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    );
  }
  if (
    !timelineData ||
    !Array.isArray(timelineData.timePeriods) ||
    timelineData.timePeriods.length === 0
  ) {
    return <div className='timeline-empty'>No timeline data available.</div>;
  } else {
    // console.log('timelineData', timelineData);
  }

  return (
    <div
      className='timeline-container'
      ref={componentRef}
      role='feed'
      aria-busy={isLoading}
    >
      {/* Fixed Header */}
      <header className='timeline-header'>
        <div>
          <h1>{timelineData.title}</h1>
          <p>{timelineData.description}</p>
        </div>
        <CloseBtn onClick={onClose} aria-label='Close timeline' />
      </header>

      {/* Scrollable Content */}

      <div>
        <div className='timeline-scroll-container' ref={scrollerRef}>
          <RecoveryDayCount currentDay={currentDay} startDay={-1} />

          {/* Layer One: Time Period Headers */}
          <div id='smooth-wrapper'>
            <div
              id='smooth-content'
              className='box-scroller'
              ref={scrollContainerRef}
            >
              {timelineData.timePeriods.map((period, periodIndex) => (
                <div
                  className={`box-group group-${periodIndex}`}
                  key={periodIndex}
                >
                  {period.categories.map((category, grpIndex) => {
                    // console.log('category', category);
                    return (
                      <div className='box' key={'p-' + grpIndex}>
                        {' '}
                        <div
                          className={`change-item-title`}
                          id={`change-title-${category.id}`}
                        >
                          {category.title}
                        </div>
                        <div className='lines'></div>
                        <div className='lines-lrg'></div>
                      </div>
                    );
                  })}
                </div>
              ))}

              <div className='change-group-column'>
                {timelineData.timePeriods.map((period, periodIndex) => {
                  // console.log('period', period);
                  return (
                    <div
                      data-day-range={period.numDays}
                      key={period.id}
                      className='change-group-wrap'
                      ref={addTimePeriodRef}
                    >
                      <div className='change-time-period-wrap'>
                        <div className='change-time-period' data-lag='0.5'>
                          <h2>{period.header}</h2>
                        </div>
                      </div>
                      <div
                        key={'cat-' + period.id}
                        className='change-group'
                        data-lag='2'
                      >
                        <div className='change-group-inner'>
                          {period.categories
                            .filter((c) => c.type === 'physical')
                            .map((category, categoryIndex) => {
                              const articleIndex =
                                periodIndex * 100 + categoryIndex; // Create a unique index
                              return (
                                <article
                                  // data-lag='0.5'
                                  key={category.id}
                                  // articleRefs.current[articleIndex] = el}
                                  tabIndex='0'
                                  role='article'
                                  aria-labelledby={`change-title-${category.id}`}
                                  className={`change-item ${category.type}`}
                                ></article>
                              );
                            })}
                          {/* </div> */}
                          {/* <div className="category-column" data-lag={speed + (variationSpeed * periodIndex)}   > */}
                          {period.categories
                            .filter((c) => c.type === 'lifestyle')
                            .map((category, categoryIndex) => {
                              const articleIndex =
                                periodIndex * 100 + 10 + categoryIndex; // Create a unique index
                              return (
                                <article
                                  // data-lag='2'
                                  key={category.id}
                                  // articleRefs.current[articleIndex] = el}
                                  tabIndex='0'
                                  role='article'
                                  aria-labelledby={`change-title-${category.id}`}
                                  className={`change-item ${category.type}`}
                                ></article>
                              );
                            })}
                          {/* </div> */}
                          {/* <div className="category-column" data-lag={speed + (variationSpeed * periodIndex)}   > */}
                          {period.categories
                            .filter((c) => c.type === 'mental')
                            .map((category, categoryIndex) => {
                              const articleIndex =
                                periodIndex * 100 + 20 + categoryIndex; // Create a unique index
                              return (
                                <article
                                  //  data-lag={2 }
                                  key={category.id}
                                  // articleRefs.current[articleIndex] = el}
                                  tabIndex='0'
                                  role='article'
                                  aria-labelledby={`change-title-${category.id}`}
                                  className={`change-item ${category.type}`}
                                ></article>
                              );
                            })}{' '}
                        </div>
                      </div>
                      <div className='change-category-spacer'></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Layer Two: Change Categories */}
        {/* <div className="parallax-layer parallax-layer-two" ref={layerTwoRef}>
                     {timelineData.timePeriods.map((period, periodIndex) => (
                        <div key={period.id} className="period-categories">
                            <div className="category-column">
                                {period.categories.filter(c => c.type === 'physical').map((category, categoryIndex) => {
                                    const articleIndex = periodIndex * 100 + categoryIndex; // Create a unique index
                                    return (
                                        <article
                                            key={category.id}
                                            ref={el => articleRefs.current[articleIndex] = el}
                                            tabIndex="0"
                                            role="article"
                                            aria-labelledby={`category-title-${category.id}`}
                                            className={`change-category ${category.type}`}>
                                            <div id={`category-title-${category.id}`}>{category.title}</div>
                                            <p>{category.description}</p>
                                        </article>
                                    )
                                })}
                            </div>
                            <div className="category-column">
                                {period.categories.filter(c => c.type === 'lifestyle').map((category, categoryIndex) => {
                                     const articleIndex = periodIndex * 100 + 10 + categoryIndex; // Create a unique index
                                     return (
                                        <article
                                            key={category.id}
                                            ref={el => articleRefs.current[articleIndex] = el}
                                            tabIndex="0"
                                            role="article"
                                            aria-labelledby={`category-title-${category.id}`}
                                            className={`change-category ${category.type}`}>
                                            <div id={`category-title-${category.id}`}>{category.title}</div>
                                            <p>{category.description}</p>
                                        </article>
                                    )
                                })}
                            </div>
                             <div className="category-column">
                                {period.categories.filter(c => c.type === 'mental').map((category, categoryIndex) => {
                                     const articleIndex = periodIndex * 100 + 20 + categoryIndex; // Create a unique index
                                     return (
                                        <article
                                            key={category.id}
                                            ref={el => articleRefs.current[articleIndex] = el}
                                            tabIndex="0"
                                            role="article"
                                            aria-labelledby={`category-title-${category.id}`}
                                            className={`change-category ${category.type}`}>
                                            <div id={`category-title-${category.id}`}>{category.title}</div>
                                            <p>{category.description}</p>
                                        </article>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div> */}
      </div>
    </div>
  );
};

RecoveryTimeline.propTypes = {
  /**
   * The data object containing all timeline information.
   */
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    timePeriods: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
        numDays: PropTypes.number.isRequired,
        offset: PropTypes.number.isRequired,
        categories: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['physical', 'lifestyle', 'mental'])
              .isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
          }),
        ).isRequired,
      }),
    ),
  }),
  /**
   * Configuration for the timeline.
   */
  config: PropTypes.object,
  /**
   * Function to handle closing the timeline view.
   */
  onClose: PropTypes.func.isRequired,
};

export default RecoveryTimeline;
