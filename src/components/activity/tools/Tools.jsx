import { useEffect, useState, useMemo } from 'react';
import useAppStore from '@/store/useAppStore';
import { activities } from '@/data/config';
import MenuCarousel from '@/components/ui/menuCarousel/MenuCarousel';
import toolsData from '../../../data/tools.js';

// import { useInView, useOnInView } from 'react-intersection-observer';
import { useOnInView } from 'react-intersection-observer';
import parse from 'html-react-parser';
import { strings } from '@/data/config';
import './styles.scss';
import PropTypes from 'prop-types';

const Tools = () => {
  const data = toolsData.tools.nodes;
  const name = 'tools';

  const setToolsInView = useAppStore((s) => s.setToolsInView);

  const [open, setOpen] = useState(true);
  const activity = useAppStore((s) => s.activity);
  const activityID = activities.find((activity) =>
    activity.url === name ? activity.id : null,
  );
  const content =
    strings.activity.find((activity) => activity.name === name) || null;

  if (content === null) {
    console.warn(`No content found for activity "${name}"`);
  }

  const showToolsOnly = useAppStore((s) => s.showToolsOnly);
  const getActiveToolIDs = useAppStore((state) => state.getActiveToolIDs);
  const yourToolsEnabled = useAppStore((s) => s.yourToolsEnabled);
  const activeIDs = getActiveToolIDs();
  const positiveIDsSet = useMemo(() => new Set(activeIDs), [activeIDs]);

  // Memoize the final carouselData
  const carouselData = useMemo(() => {
    const filteredData = data.filter((obj) => activeIDs.includes(obj.id));
    //setAccData(filteredData)
    return showToolsOnly ? filteredData : data;
  }, [showToolsOnly, activeIDs, data]);

  const setActivity = useAppStore((s) => s.setActivity);
  const setAcronymID = useAppStore((s) => s.setAcronymID);
  const setShowAccCard = useAppStore((s) => s.setShowAccCard);

  const handleClick = (id) => () => {
    setAcronymID(id);
    setShowAccCard(true);
    setActivity(1);
  };

  // useEffect(() => {
  //   setOpen(activityID === activity);
  // }, [activity, activityID]);

  useEffect(() => {
    setOpen(activity === -1);
  }, [activity]);

  const inViewRef = useOnInView(
    // (inView, entry) => {
    (inView) => {
      if (inView) {
        // Do something with the element that came into view
        // console.log('Element is in view', entry.target)
        setToolsInView(true);
      } else {
        // console.log('Element left view', entry.target)
        setToolsInView(false);
      }
    },
    {
      /* Optional options */
      threshold: 0,
      rootMargin: '-15% 0% -30% 0%',
    }, // Optional IntersectionObserver options
  );

  return (
    <div className={'activity' + (open ? ' show' : ' hide')}>
      <div ref={inViewRef} className={'activity' + (open ? ' show' : ' ')}>
        <section className='tools' id='tools'>
          <h2>
            <u>{content?.title}</u>
          </h2>
          <div className='description'>
            {content.description &&
              content.description.map((html, i) => {
                return <p key={i}>{parse(html)}</p>;
              })}
          </div>
          <MenuCarousel
            handleClick={handleClick}
            data={carouselData}
            filterIDs={positiveIDsSet}
            showFavourites={yourToolsEnabled}
          />
        </section>
      </div>
    </div>
  );
};
Tools.propTypes = {
  handleMenuClick: PropTypes.func,
};
export default Tools;
