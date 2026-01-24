import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CloseBtn from '@/components/ui/buttons/close/CloseBtn';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import './styles.scss';

const RecoveryTimeline = ({ data, config, onClose }) => {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

  const [timelineData, setTimelineData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [enableScrollEffects, setEnableScrollEffects] = useState(false);
  const [error, setError] = useState(null);
  const componentRef = useRef(null);
  const scrollContainerRef = useRef();
  const containerRef = useRef();
  // const layerOneRef = useRef(null);
  // const layerTwoRef = useRef(null);
  const articleRefs = useRef([]);
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

  //  useLayoutEffect(() => {
  //     if (!isLoading && timelineData && config) {
  //         const scrollEl = scrollContainerRef.current;
  //         const layerOneEl = layerOneRef.current;
  //         const layerTwoEl = layerTwoRef.current;

  //         if(!scrollEl || !layerOneEl || !layerTwoEl) return;

  //         const { slowLayerSpeed, fastLayerSpeed } = config.parallax;

  //         // Restore scroll position
  //         const savedScrollPosition = sessionStorage.getItem("timelineScroll");
  //         if (savedScrollPosition) {
  //             scrollEl.scrollTop = Number(savedScrollPosition);
  //         }

  //         const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  //         if (prefersReducedMotion) {
  //             return;
  //         }

  //         mainTimeline.current = gsap.timeline({
  //             scrollTrigger: {
  //                 trigger: scrollEl,
  //                 scrub: true,
  //                 start: "top top",
  //                 end: "bottom bottom",
  //                 onUpdate: (self) => {
  //                     sessionStorage.setItem("timelineScroll", self.scroll());
  //                 }
  //             }
  //         });

  //         mainTimeline.current
  //             .to(layerOneEl, { y: `${-50 * slowLayerSpeed}%`, ease: "none" }, 0)
  //             .to(layerTwoEl, { y: `${-15 * fastLayerSpeed}%`, ease: "none" }, 0);

  //         const articleTriggers = [];
  //         const articles = gsap.utils.toArray(".change-category");
  //         articles.forEach(article => {
  //             const trigger = ScrollTrigger.create({
  //                 trigger: article,
  //                 scroller: scrollEl,
  //                 start: "top 80%",
  //                 end: "bottom 20%",
  //                 toggleClass: {targets: article, className: "active"},
  //                 onEnter: () => article.classList.add("entering"),
  //                 onLeave: () => article.classList.add("exiting"),
  //                 onEnterBack: () => article.classList.add("entering"),
  //                 onLeaveBack: () => article.classList.add("exiting"),
  //             });
  //             articleTriggers.push(trigger);
  //         });

  //         // Recalculate on resize
  //         let resizeObserver;
  //         if (scrollEl) {
  //             resizeObserver = new ResizeObserver(() => {
  //                  ScrollTrigger.refresh();
  //             });
  //             resizeObserver.observe(scrollEl);
  //         }

  //         return () => {
  //             mainTimeline.current.kill();
  //             articleTriggers.forEach(trigger => trigger.kill());
  //             if (resizeObserver) {
  //                 resizeObserver.disconnect();
  //             }
  //         }
  //     }
  //  }, [isLoading, timelineData, config]);

  // Focus management
  // useEffect(() => {
  //     if (!isLoading && timelineData) {
  //         const focusableElements = articleRefs.current.filter(el => el);
  //         const container = componentRef.current;
  //         const handleKeyDown = (e) => {
  //             if (e.key === "ArrowDown" || e.key === "ArrowRight") {
  //                 e.preventDefault();
  //                 const currentFocus = document.activeElement;
  //                 const currentIndex = focusableElements.indexOf(currentFocus);
  //                 const nextIndex = (currentIndex + 1) % focusableElements.length;
  //                 focusableElements[nextIndex].focus();
  //             } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
  //                 e.preventDefault();
  //                 const currentFocus = document.activeElement;
  //                 const currentIndex = focusableElements.indexOf(currentFocus);
  //                 const nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
  //                 focusableElements[nextIndex].focus();
  //             }
  //         };
  //         if(container){
  //             container.addEventListener("keydown", handleKeyDown);
  //             return () => container.removeEventListener("keydown", handleKeyDown);
  //         }
  //     }
  // }, [isLoading, timelineData]);

  useGSAP(
    () => {
      if (!enableScrollEffects) return;

      /*************************************
       * Boxes for triggers
       ************************************/
      setTimeout(() => {
        const boxes = gsap.utils.toArray('.box');
        const changeItems = gsap.utils.toArray('.change-item');
        console.log('changeItems ', changeItems);

        changeItems.forEach((item, i) => {
          item.classList.add('entering');
          item.addEventListener('transitionend', function h() {
            item.classList.remove('entering');
            item.removeEventListener('transitionend', h);
          });
        });

        boxes.forEach((box, i) => {
          const parent = box.parentNode;

          const endPos =
            (parent.offsetHeight / boxes.length) * (boxes.length - (i + 1));
          console.log('changeItems[i].parentNode ', changeItems[i].parentNode);
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
                scroller: '.timeline-scroll-container',
                start: 'top bottom',
                end: () => `+=${endPos}px`,
                pinSpacing: false,
                pin: false,
                scrub: false,
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
              scroller: '.timeline-scroll-container',
              start: `top top`,
              end: () => `+=${group.offsetHeight}px`,
              pinSpacing: false,
              anticipatePin: true,
              pin: true,
              id: i,
              scrub: false,
              onEnter: () => (self) => {
                //   console.log('onEnter group self.id ', self);
              },
              onLeave: (self) => {
                console.log('onLeave group self.id ', self);
              },
            },
          });
        });
      });
    },
    {
      dependencies: [enableScrollEffects],
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
  }

  const speed = 2;
  const variationSpeed = 0.1;
  const lag = 1;
  const variationLag = 0.1;
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
      <div id='TMPsmooth-wrapper' ref={containerRef}>
        <div id='TMPsmooth-content'>
          <div className='timeline-scroll-container'>
            <div className='count'>
              <div>day</div>
              <div>10</div>
            </div>
            {/* Layer One: Time Period Headers */}
            <div className='box-scroller' ref={scrollContainerRef}>
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
            </div>

            <div className='change-group-column'>
              {timelineData.timePeriods.map((period, periodIndex) => (
                <div
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
                              //  data-lag={2 }
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
                              //  data-lag={2 }
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
              ))}
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
