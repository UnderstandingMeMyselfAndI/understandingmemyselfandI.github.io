import { useEffect, useState } from 'react';
import useAppStore from '@/store/useAppStore';
import { activities } from '@/data/config';
import { strings } from '@/data/config';
import PropTypes from 'prop-types';
import './styles.scss';

const FAQ = () => {
  const name = 'lingo';
  const [open, setOpen] = useState(false);
  const activity = useAppStore((s) => s.activity);
  const activityID = activities.find((activity) =>
    activity.url === name ? activity.id : null,
  );

  useEffect(() => {
    setOpen(activityID === activity);
  }, [activity, activityID]);

  // const handleClose = () => setOpen(false);

  return (
    <div className={'activity' + (open ? ' show' : ' hide')}>
      <section className={name}>
        <div>
          <div className='title'> How your data is kept private</div>
          <div className='content'> <p>Your data is stored only on this device. It is never sent to a server,
          never shared, and never uploaded anywhere.</p> <p></p>To protect your privacy,
          the app can lock your data using encryption, similar to how banking or
          password apps work.</p></div>
        </div>
      </section>
    </div>
  );
};
FAQ.propTypes = {};

export default FAQ;
