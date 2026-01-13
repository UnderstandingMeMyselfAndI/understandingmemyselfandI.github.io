import useAppStore from '@/store/useAppStore';
import { useState, useEffect } from 'react';
import useLoadScript from '@/hooks/useLoadScript';
import './styles.scss';

const NewsletterSignUp = () => {
  const setActivity = useAppStore((state) => state.setActivity);
  const [checked, setChecked] = useState(false);
  const nss = useAppStore((s) => s.nss); // subscribed to newsletter
  const setNss = useAppStore((s) => s.setNSS);

  const [open, setOpen] = useState(false);
  const activity = useAppStore((s) => s.activity);
  useEffect(() => {
    setOpen(activity === -1);
  }, [activity]);

  useLoadScript('https://sibforms.com/forms/end-form/build/main.js', {
    // onLoad: () => console.log('Script loaded'),
    // onError: () => console.error('Script failed to load'),
    async: true,
    defer: true,
  });

  const onSuccess = (e) => {
    setNss(true);
  };
  const onError = (e) => {};
  const [formData, setFormData] = useState({
    email: '',
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  // Your form ID from the embed code
  const formId =
    'MUIFALc6BdLxDTN5bUt_Nxxf8w9uI6rUsNhO6T04esvA31bm_6DpC7pGj934CpQpqqUWO48PcndNrWhtNl1tThdGiLUq_9ug9YeW73EJRJEUyt2pBT0QszFGXW6MlGDojXDwwPATPsUn1QHNh6MVO7kXp4J5AEWQSWarZtSIMx68uxLTeUn7Ho56eeY-v6dp4jtFSkGL8E3dBf6wQQ==';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      // Create form data for submission
      const submitData = new FormData();
      submitData.append('EMAIL', formData.email);
      submitData.append('email_address_check', ''); // Honeypot field
      submitData.append('locale', 'en');

      const response = await fetch(
        `https://d44b221a.sibforms.com/serve/${formId}`,
        {
          method: 'POST',
          body: submitData,
          mode: 'no-cors', // Required for cross-origin requests
        },
      );

      // Since we're using no-cors, we can't read the response
      // We'll assume success if no error is thrown
      setStatus({ loading: false, success: true, error: null });
      setFormData({ email: '' });
      onSuccess && onSuccess({ email: formData.email });
    } catch (error) {
      setStatus({ loading: false, success: false, error: error.message });
      onError && onError(error.message);
    }
  };
  if (status.success) {
    return open ? (
      <div className='signup-success'>
        <div>
          <div className='h'>
            {/* <div className='success-icon'>✅</div> */}
            <div className='success-icon'>👍🏼</div>
            <h3>
              Thanks for
              <br />
              signing up.
            </h3>
          </div>
          <p>Check your inbox to confirm your email address.</p>
        </div>
      </div>
    ) : (
      <></>
    );
  }

  const handlePrivacyClick = (e) => {
    e.preventDefault();
    setActivity(10);
  };

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };
  //Only show if the user hasn't subscribed from this device
  return open ? (
    <>
      {!nss && (
        <div className='newsletter-signup-form' id='newsletter'>
          <div className='sib-form'>
            <div id='sib-form-container' className='sib-form-container'>
              <div
                id='sib-container'
                className='sib-container--large sib-container--vertical'
              >
                <form
                  onSubmit={handleSubmit}
                  className='signup-form'
                  id='sib-form'
                  method='POST'
                  data-type='subscription'
                  noValidate={true}
                >
                  <div className='form-row'>
                    <div className='title'>
                      Big things are coming.
                      <br />
                      Be the first to hear.
                    </div>
                  </div>
                  <div className='form-row'>
                    <p>
                      Get useful updates &amp; exclusive invites delivered
                      direct to your inbox.
                    </p>
                  </div>
                  {status.error && (
                    <div className='error-message'>
                      <span className='error-icon'>⚠️</span>
                      {status.error}
                    </div>
                  )}
                  <div className='form-row'>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      placeholder='Email address'
                      value={formData.email}
                      onChange={handleChange}
                      // autoComplete
                      required
                      // data-required='true'
                      // disabled={status.loading}
                      className='email-input input'
                    />
                    <label className='entry__error entry__error--primary'></label>
                  </div>
                  <div className='form-row '>
                    <div>
                      <div className='form__label-row entry__choice '>
                        <label className='privacy-label'>
                          <input
                            type='checkbox'
                            className=''
                            checked={checked}
                            id='OPT_IN'
                            name='OPT_IN'
                            required
                            onChange={handleCheckboxChange}
                          />
                          I agree to receive emails from Ummi and accept the
                          terms of the{' '}
                          <a href='#' onClick={handlePrivacyClick}>
                            data privacy policy
                          </a>
                          .
                        </label>
                        <div className='consent'></div>
                      </div>
                      <label className='entry__error entry__error--primary'></label>
                    </div>
                  </div>
                  <div className='form-row privacy'>
                    <div>
                      <p>
                        We use Brevo as our marketing platform. By submitting
                        this form you agree that the personal data you provided
                        will be transferred to Brevo for processing in
                        accordance with{' '}
                        <a
                          href='https://www.brevo.com/en/legal/privacypolicy/'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Brevo&apos;s Privacy Policy.
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className='form-row'>
                    <button
                      type='submit'
                      className='signup-button btn'
                      aria-label='Sign Up'
                      disabled={status.loading || !formData.email}
                    >
                      {status.loading ? (
                        <>
                          <span className='loading-spinner'></span>
                          Signing you Up...
                        </>
                      ) : (
                        'Sign Up'
                      )}
                    </button>
                  </div>
                  <div className='form-row privacy-google'>
                    This app is protected by reCAPTCHA and the Google
                    <a href='https://policies.google.com/privacy'>
                      Privacy Policy
                    </a>{' '}
                    and
                    <a href='https://policies.google.com/terms'>
                      Terms of Service
                    </a>{' '}
                    apply.
                  </div>
                  <input
                    type='text'
                    name='email_address_check'
                    defaultValue=''
                    className='input--hidden'
                  />
                  <input type='hidden' name='locale' value='en' />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <></>
  );
};

export default NewsletterSignUp;
