import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { strings } from '@/data/config';
import useAppStore from '@/store/useAppStore';

import './styles.scss';
const YourPrivacyCTA = () => {
  const activity = useAppStore((state) => state.activity);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(activity === -1);
  }, [activity]);

  const context = 'privacy';
  const setActivity = useAppStore((s) => s.setActivity);

  const content =
    strings.activity.find((activity) => activity.name === context) || null;
  if (content === null) {
    console.warn('No content found for activity "' + context + '"');
  }

  const handleClick = () => {
    console.log('YourPrivacyCTA handleClick');
    setActivity(10);
  };

  return (
    <section className={'your-privacy cta' + (open ? ' show' : '')}>
      <div className='title'>
        <h3>
          <u>{parse(content?.title)}</u>
        </h3>
      </div>
      {content?.cta?.content?.map((html, i) => {
        return <p key={i}>{parse(html)}</p>;
      })}
      <button className='btn' onClick={() => handleClick()}>
        {content?.cta?.btnLabel}
      </button>
    </section>
  );
};

export default YourPrivacyCTA;
