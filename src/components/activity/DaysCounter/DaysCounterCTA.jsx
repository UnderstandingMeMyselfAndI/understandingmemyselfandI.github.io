import { useState, useEffect } from 'react';

import DaysCounterBtn from 'ui/buttons/daysCounter/daysCounterBtn';
import parse from 'html-react-parser';
import { strings } from '@/data/config';
import useAppStore from '@/store/useAppStore';
import './stylesCTA.scss';
const DaysCounterCTA = () => {
  const [open, setOpen] = useState(false);
  const activity = useAppStore((s) => s.activity);

  useEffect(() => {
    setOpen(activity === -1);
  }, [activity]);
  const content =
    strings.activity.find((activity) => activity.name === 'daysCounter') ||
    null;
  if (content === null) {
    console.warn('No content found for activity "daysCounter"');
  }

  return open ? (
    <div className={'activity activity-days-counter-cta ' + (open ? ' show' : '')}>
      <div className='title'>
        <h3>
          <u>
            <span>{content?.cta?.title}</span>
          </u>
        </h3>
      </div>
      {content?.cta?.content?.map((html, i) => {
        return <p key={i}>{parse(html)}</p>;
      })}
      <DaysCounterBtn />
    </div>
  ) : (
    <> </>
  );
};

export default DaysCounterCTA;
