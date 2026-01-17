import { useEffect, useState } from 'react';

import QRCode from 'ui/QRCode/QRCode.jsx';
import FooterMetadata from '@/components/activity/footer/FooterMetadata.jsx';
import UpdateCTA from '../../ui/updateCTA/updateCTA';
import useAppStore from '@/store/useAppStore';

import './styles.scss';
function Footer() {
  const activity = useAppStore((state) => state.activity);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(activity === -1);
  }, [activity]);

  return (
    <div className={'activity activity-footer' + (open ? ' show' : '')}>
      <section className='qr' id='share'>
        <h3>
          <u>Spread the love</u>
        </h3>
        <p>
          <u>Share the app,</u> <br />
          <u>scan the QR Code</u>
        </p>
        <QRCode label='' />
        <p>
          <b>
            <u>www.ummi.now</u>
          </b>
        </p>
      </section>

      <section id='gratitude'>
        <div className='big2'>
           <h3>
          <u>Gratitude &amp; Inspiration</u>
          </h3>
        </div>
        <p>
          This app was inspired by the amazing people who facilitate groups and
          meetings at
          <a
            href='https://www.nottinghamrecoverynetwork.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Nottingham Recovery Network (NRN)
          </a>
          <br />
          Nottingham UK and their hard work and dedication to help people
          through their recovery journey.
        </p>
        <p>
          If you live in Nottingham U.K. and need help reach out to them{' '}
          <a
            href='https://www.nottinghamrecoverynetwork.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            nottinghamrecoverynetwork.com
          </a>
        </p>
        <p className='big2'>
          <b>
            <u> &#x2661; BIG LOVE &#x2661; </u>
          </b>
        </p>
      </section>

      <section id='feedback'>
        <h3>
          <u>FEEDBACK</u>
        </h3>

        <p>
          Like everyone going through recovery and/or dealing with their mental
          health, these tools and this app can only get better and improve if we
          know what works, what doesn&apos;t, what works for you and what
          doesn&apos;t.
        </p>
        <p>
          Is there something missing? Does something not make sense? Could it be
          better?
        </p>
        <p>
          <b>Positive or negative</b> we want to hear your thoughts.
        </p>
        <p>
          {' '}
          <u>
            ALL feedback is appreciated and
            <br />
            we get stronger together
          </u>
        </p>
        <p>
          Drop us an email at the address below with your feedback.
          <br /> <br />
          <a
            href='mailto:hello@ummi.now?subject=UMMI%20App%20Feedback'
            target='_blank'
            rel='noopener noreferrer'
          >
            hello@ummi.now
          </a>
        </p>
        <p>
          <b>
            <u>www.ummi.now</u>
          </b>
        </p>
      </section>
      <section>
        <p>
          <u className='big'>
            <b>Big up yourself,</b>
          </u>
          <u className='big'>
            <b>you are stronger</b>
          </u>
          <u className='big'>
            <b>than you think.</b>
          </u>
          <br />
          <span className='big4 r90'>:)</span>
        </p>
      </section>
      <section>
        <p>
          This website and app is constantly evolving from the feedback received
          and new ideas to help us get better together.
        </p>
        <p>
          If you want to help keep this app free for all of us and help the
          development please consider <br />
        </p>
        <p>
          <a
            href='https://www.buymeacoffee.com/ummi'
            target='_blank'
            rel='noopener noreferrer'
          >
            Click here to buy us a coffee or give a small donation
          </a>
          <br />
          <br />
          <span>
            &hearts; &#x2661; We would really appreciate it.&#x2661;
            &hearts;{' '}
          </span>
        </p>
      </section>

      <UpdateCTA />

      <FooterMetadata />
    </div>
  );
}

export default Footer;
