import useAppStore from '@/store/useAppStore'
import { useState } from 'react'
import './styles.scss'


const NewsletterSignUp = () => {

	const setActivity = useAppStore((state) => state.setActivity)

	const onSuccess = (e) => {
			console.log('onSuccess')
			console.log(e)
		}
		const onError = (e) => {
			console.log('onError')
			console.log(e)
		}
	const [formData, setFormData] = useState({
		email: '',
		
	})
	const [status, setStatus] = useState({
		loading: false,
		success: false,
		error: null,
	})
	
	// Your form ID from the embed code
	const formId =
		'MUIFALc6BdLxDTN5bUt_Nxxf8w9uI6rUsNhO6T04esvA31bm_6DpC7pGj934CpQpqqUWO48PcndNrWhtNl1tThdGiLUq_9ug9YeW73EJRJEUyt2pBT0QszFGXW6MlGDojXDwwPATPsUn1QHNh6MVO7kXp4J5AEWQSWarZtSIMx68uxLTeUn7Ho56eeY-v6dp4jtFSkGL8E3dBf6wQQ=='
	
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}
	
	const handleSubmit = async (e) => {
		e.preventDefault()
		setStatus({ loading: true, success: false, error: null })
	
		try {
			// Create form data for submission
			const submitData = new FormData()
			submitData.append('EMAIL', formData.email)
			submitData.append('email_address_check', '') // Honeypot field
			submitData.append('locale', 'en')
	
			const response = await fetch(`https://d44b221a.sibforms.com/serve/${formId}`, {
				method: 'POST',
				body: submitData,
				mode: 'no-cors', // Required for cross-origin requests
				})
				
				console.log("response")
				console.log(response)
	
			// Since we're using no-cors, we can't read the response
			// We'll assume success if no error is thrown
			setStatus({ loading: false, success: true, error: null })
			setFormData({ email: '' })
			onSuccess && onSuccess({ email: formData.email })
		} catch (error) {
			setStatus({ loading: false, success: false, error: error.message })
			onError && onError(error.message)
		}
	}
	if (status.success) {
		return (
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
		)
	}
	

	// const recaptchaID = '6Lfi5TUsAAAAAJP-2sDeKOyqOIvcK00HK2EiaFW5'
	// const recaptchaSecretKey = '6Lfi5TUsAAAAAPffRVEoDmLrWiNXEehy7hbZ6j2a'
	// // const recaptchaSiteKeyv2 = '6LcCFDYsAAAAANYEe4iiL89d-UkjMfK9gikbu9yc'
	// // const recaptchaSecretKeyv2 = '6Lfi5TUsAAAAAPffRVEoDmLrWiNXEehy7hbZ6j2a'
	// const recaptchaSiteKeyLegacy = '6Lfi5TUsAAAAAPffRVEoDmLrWiNXEehy7hbZ6j2a'

	const handlePrivacyClick = (e) => {
		e.preventDefault();
		setActivity(10);
		
	}
	
	
	return (
		<div className='newsletter-signup-form'>
			<div className='sib-form'>
				<div id='sib-form-container' className='sib-form-container'>
					<div id='sib-container' className='sib-container--large sib-container--vertical'>
						<form onSubmit={handleSubmit} className='signup-form'>
							<div className='form-row'>
								<div className='title'>
									Big things are coming.
									<br />
									Be the first to hear.
								</div>
							</div>
							<div className='form-row'>
								<p>
									Get useful updates &amp; exclusive invites
									<br /> delivered direct to your inbox.
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
									required
									data-required='true'
									disabled={status.loading}
									className='email-input input'
								/>
								<label className='entry__error entry__error--primary'></label>
							</div>
							<div className='form-row '>
								<div>
									<div className='form__label-row entry__choice '>
										<label>
											<input type='checkbox' className='input_replaced' defaultChecked='0' id='OPT_IN' name='OPT_IN' required />
											<span className='checkbox checkbox_tick_positive'></span>
										</label>
										<div className='consent'>
											I agree to receive your newsletters and accept the <a href='#' onClick={handlePrivacyClick}>data privacy statement</a>.
										</div>
									</div>
									<label className='entry__error entry__error--primary'></label>
								</div>
							</div>
							<div className='form-row privacy'>
								<div>
									<p>
										We use Brevo as our marketing platform. By submitting this form you agree that the personal data you provided will be transferred to Brevo for processing in
										accordance with{' '}
										<a href='https://www.brevo.com/en/legal/privacypolicy/' target='_blank' rel='noreferrer'>
											Brevo's Privacy Policy.
										</a>
									</p>
								</div>
							</div>

							<div className='form-row'>
								<button type='submit' className='signup-button btn' aria-label='Sign Up' disabled={status.loading || !formData.email}>
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

							<input type='text' name='email_address_check' value='' className='input--hidden' />
							<input type='hidden' name='locale' value='en' />
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NewsletterSignUp
