import useAppStore from '@/store/useAppStore'
import { useState, useEffect } from 'react'
import { trackEvent } from '@/js/analytics/analytics'
import './styles.scss'

const NewsletterSignUp = () => {
  const COMPONENT_ID = 15
  const setActivity = useAppStore((state) => state.setActivity)
  const [checked, setChecked] = useState(false)
  const nss = useAppStore((s) => s.nss) // subscribed to newsletter
  const setNss = useAppStore((s) => s.setNSS)
  const setIsModal = useAppStore((s) => s.setIsModal)
  const isModal = useAppStore((s) => s.isModal)
  const gae = useAppStore((s) => s.gae) // Google Analytics Enabled
  // TODO #22 [ ]: Ensure that Newsletter menu item is removed after user sign up. Should also be recorded in the store
  // TODO #23 : Check form validation and UX
  const [open, setOpen] = useState(true)
  const activity = useAppStore((s) => s.activity)

  useEffect(() => {
    !nss && setOpen(activity === COMPONENT_ID || !isModal)
  }, [activity, isModal, nss])

  useEffect(() => {
    window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code'
    window.LOCALE = 'en'
    window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE =
      'The information provided is invalid. Please review the field format and try again.'
    window.REQUIRED_ERROR_MESSAGE = 'This field cannot be left blank. '
    window.GENERIC_INVALID_MESSAGE =
      'The information provided is invalid. Please review the field format and try again.'
    window.translation = {
      common: {
        selectedList: '{quantity} list selected',
        selectedLists: '{quantity} lists selected',
        selectedOption: '{quantity} selected',
        selectedOptions: '{quantity} selected',
      },
    }
    var AUTOHIDE = Boolean(1)
  }, [])

  // NOTE: Brevo main.js removed - we use the API directly via fetch.
  // The script expected DOM elements from their template which caused errors.

  const onSuccess = () => {
    setNss(true)
    trackEvent('NLTR_sub_success', {}, gae)
  }
  const onError = (msg) => {
    // Extract code if possible or just log generic
    const code = 'generic' // We might parse msg if it has a standardized format
    trackEvent(`NLTR_Brevo_Fail_${code}`, { message: msg }, gae)
  }

  const [formData, setFormData] = useState({
    email: '',
  })

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  })

  const [errors, setErrors] = useState({
    email: null,
    checkbox: null,
  })

  // Your form ID from the embed code
  const formId =
    'MUIFALc6BdLxDTN5bUt_Nxxf8w9uI6rUsNhO6T04esvA31bm_6DpC7pGj934CpQpqqUWO48PcndNrWhtNl1tThdGiLUq_9ug9YeW73EJRJEUyt2pBT0QszFGXW6MlGDojXDwwPATPsUn1QHNh6MVO7kXp4J5AEWQSWarZtSIMx68uxLTeUn7Ho56eeY-v6dp4jtFSkGL8E3dBf6wQQ=='

  const validateForm = () => {
    let isValid = true
    const newErrors = { email: null, checkbox: null }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.email) {
      newErrors.email = 'Email address is required.'
      trackEvent('NLTR_sub_email_fail', { reason: 'empty' }, gae)
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
      trackEvent('NLTR_sub_email_fail', { reason: 'invalid_format' }, gae)
      isValid = false
    }

    if (!checked) {
      newErrors.checkbox = 'You must agree to the terms.'
      trackEvent('NLTR_sub_terms_fail', {}, gae)
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (errors.email) setErrors({ ...errors, email: null })
    if (status.error) setStatus({ ...status, error: null })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!navigator.onLine) {
      setStatus({
        ...status,
        error: 'You are offline. Please check your internet connection.',
      })
      return
    }

    setStatus({ loading: true, success: false, error: null })

    try {
      // Create form data for submission
      const submitData = new FormData()
      submitData.append('EMAIL', formData.email)
      submitData.append('email_address_check', '') // Honeypot field
      submitData.append('locale', 'en')

      await fetch(`https://d44b221a.sibforms.com/serve/${formId}`, {
        method: 'POST',
        body: submitData,
        mode: 'no-cors', // Required for cross-origin requests
      })

      // Since we're using no-cors, we can't read the response
      // We'll assume success if no error is thrown
      setStatus({ loading: false, success: true, error: null })
      setFormData({ email: '' })
      onSuccess && onSuccess()
    } catch (error) {
      setStatus({ loading: false, success: false, error: error.message })
      onError && onError(error.message)
    }
  }
  //TODO: #24 Check this is being displayed following sign up - it wasn't when tested

  //TODO: #28 Confirmantion and validation of checkbox not working as of 03.02.2026

  const handlePrivacyClick = (e) => {
    e.preventDefault()
    setActivity(10)
  }

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked)
    if (errors.checkbox) setErrors({ ...errors, checkbox: null })
    if (status.error) setStatus({ ...status, error: null })
  }

  // Don't render if user has already subscribed (unless showing success message)
  // if (nss && !status.success) return null
  //
  const bgImg = {
    src: '/ui/signup-thanks.avif',
    alt: 'Picture of man saluting',
  }
  return (
    <div
      id='newsletter'
      className={
        'activity activity-newsletter-signup-form' + (open ? ' show' : '')
      }>
      <div className='sib-form'>
        <div id='sib-form-container' className='sib-form-container'>
          <div
            id='sib-container'
            className='sib-container--large sib-container--vertical'>
            {status.success ? (
              <div className='signup-success'>
                <div className='wrap'>
                  {/* <div className='success-icon'>👍🏼</div> */}
                  <h3>
                    Thanks for
                    <br />
                    signing up
                  </h3>
                  <p>Check your inbox to confirm your email address.</p>
                </div>
                <div className='bg-img'>
                  <img className='bg' src={bgImg.src} alt={bgImg.alt} />
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className='signup-form'
                id='sib-form'
                method='POST'
                data-type='subscription'
                noValidate={true}>
                <div className='form-row'>
                  <div className='title'>
                    Bigger things are coming.
                    <br />
                    Be the first to hear.
                  </div>
                </div>
                <div className='form-row'>
                  <p>
                    Get useful updates &amp; exclusive invites delivered direct
                    to your inbox.
                  </p>
                </div>
                {status.error && (
                  <div className='error-message' role='alert'>
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
                    autoComplete='off'
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`email-input input ${errors.email ? 'input-error' : ''}`}
                  />
                  {errors.email && (
                    <span
                      id='email-error'
                      className='entry__error entry__error--primary'
                      role='alert'>
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className='form-row'>
                  <div>
                    <div className='form__label-row entry__choice'>
                      <label className='privacy-label' htmlFor='OPT_IN'>
                        <input
                          type='checkbox'
                          checked={checked}
                          id='OPT_IN'
                          name='OPT_IN'
                          aria-invalid={errors.checkbox ? 'true' : 'false'}
                          aria-describedby={
                            errors.checkbox ? 'checkbox-error' : undefined
                          }
                          onChange={handleCheckboxChange}
                        />
                        I agree to receive emails from Ummi and accept the terms
                        of the{' '}
                        <a href='#' onClick={handlePrivacyClick}>
                          data privacy policy
                        </a>
                        .
                      </label>
                    </div>
                    {errors.checkbox && (
                      <span
                        id='checkbox-error'
                        className='entry__error entry__error--primary'
                        role='alert'>
                        {errors.checkbox}
                      </span>
                    )}
                  </div>
                </div>
                <div className='form-row privacy'>
                  <div>
                    <p>
                      We use Brevo as our marketing platform. By submitting this
                      form you agree that the personal data you provided will be
                      transferred to Brevo for processing in accordance with{' '}
                      <a
                        href='https://www.brevo.com/en/legal/privacypolicy/'
                        target='_blank'
                        rel='noreferrer'>
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
                    disabled={status.loading}>
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsletterSignUp
