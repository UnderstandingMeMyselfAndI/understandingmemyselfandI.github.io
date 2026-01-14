import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import useAppStore from '@/store/useAppStore';
import { strings } from '@/data/config';
import './styles.scss';
const YourPrivacy = () => {
  const activity = useAppStore((state) => state.activity);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(activity === -1);
  }, [activity]);
  const context = 'privacy';

  const content =
    strings.activity.find((activity) => activity.name === context) || null;
  if (content === null) {
    console.warn('No content found for activity "' + context + '"');
  }

  return (
    <section className={'privacy' + (open ? ' show' : '')}>
      <h4>{parse(content?.title)}</h4>
      {content?.content?.map((html, i) => {
        return <p key={i}>{parse(html)}</p>;
      })}
    </section>
  );
};

export default YourPrivacy;
