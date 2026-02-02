import { useState, useEffect } from 'react'
import { activities } from '@/data/config'
import useAppStore from '@/store/useAppStore'
import CloseBtn from 'buttons/close/CloseBtn'
import Backdrop from 'components/ui/backdrop/Backdrop'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})
import './styles.scss'
// TODO: #13 Add in newsletter supplier privacy
const PrivacyPolicy = () => {
  const name = 'privacy-policy'
  const id = 10

  const [open, setOpen] = useState(false)
  const activity = useAppStore((s) => s.activity)
  const setActivity = useAppStore((s) => s.setActivity)
  const setIsModal = useAppStore((s) => s.setIsModal)
  const activityObj = activities.find((activity) =>
    activity.url === name ? activity.id : null,
  )
  const el = document.getElementById('privacy')

  useEffect(() => {
    open && setIsModal(activitiesById[id]?.modal)
  }, [open])

  useEffect(() => {
    if (!activityObj) return
    setOpen(activityObj.id === activity)
  }, [activity, activityObj, el])

  // const handleCCPAClick = () => {
  // 	setActivity(12)
  // }
  const handleClose = () => {
    handleScrollTop()
    setOpen(false)
    setActivity(-1)
  }

  const handleScrollTop = () => {
    const el = document.getElementById('privacy')
    el.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      id='privacy'
      className={'activity activity-privacy fixed' + (open ? ' show' : '')}>
      <CloseBtn onClick={handleClose} className='close-btn' />
      <div className='inner'>
        <h1>Privacy Policy</h1>
        <h2>Your data and privacy</h2>
        <div className='last-updated'>Last Updated: December 21, 2025</div>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to the <strong>Ummi</strong> Progressive Web Application
            (the &quot;App&quot;). This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our App,
            which provides informational resources and tools related to
            Cognitive Behavioral Therapy (CBT), Acceptance and Commitment
            Therapy (ACT), Dialectical Behavior Therapy (DBT), Rational Emotive
            Behavior Therapy (REBT), SMART Recovery and others. The App operates
            worldwide and offers support information only.
          </p>
          <p>
            Please read this policy carefully. By using the App, you consent to
            the data practices described. If you do not agree, please do not use
            the App.
          </p>
          <div className='important-notice'>
            <strong>
              <u>Important Notice:</u>
            </strong>
            <p>
              <strong>
                This app provides support information only and is not a
                substitute for professional medical advice, diagnosis, or
                treatment.
              </strong>
            </p>
            <p>
              Always seek the advice of your physician or qualified mental
              health provider with any questions you may have regarding a
              medical or psychological condition.
            </p>
            <p>
              <strong>This app is intended for users aged 18 and over</strong>{' '}
              due to the nature of some content surrounding addiction and
              recovery. We do not knowingly collect data from individuals under
              18. Use by persons under 18 is prohibited, and we rely on users to
              self-certify their age. If we become aware of underage use, we
              will delete any collected data promptly.
            </p>
          </div>
        </section>

        <section>
          <h2>2. Data Controller & Contact Information</h2>
          <p>
            The data controller for your personal data is <strong>Ummi</strong>.
          </p>
          <div className='contact-info'>
            <p>
              For any questions about this Privacy Policy or your data, please
              contact us at:
            </p>
            <ul>
              <li>
                <strong>Email:</strong>{' '}
                <a href='mailto:hello@ummi.now'>hello@ummi.now</a>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2>3. Information We Collect</h2>
          <h3>A. Information You Provide Directly</h3>
          <ul>
            <li>
              <strong>Account Information:</strong> If you register for an
              account, we use third-party authentication services (e.g.,
              email/password, Google, Facebook, or Twitter via Firebase) for
              account creation and management. We receive basic profile
              information you consent to share, such as email and display name.
            </li>
            <li>
              <strong>Onboarding Information (Optional):</strong> If you choose
              to participate in onboarding, we collect your responses to
              progressive disclosure questions, such as your reason for
              visiting, circumstances in addiction recovery, drug of choice,
              whether you are supported by other services, the reason for your
              visit to the App, and the type of information you are seeking.
              Enrollment is entirely voluntary, and data is stored separately
              from account identifiers with encryption on identifiers.
            </li>
            <li>
              <strong>Days Counter Data:</strong> The date and time you set for
              the Days Counter feature are stored locally on your device.
            </li>
            <li>
              <strong>Communication Data:</strong> If you contact us, we collect
              the contents of your message.
            </li>
          </ul>
          <h3>B. Information Collected Automatically</h3>
          <ul>
            <li>
              <strong>Usage Data:</strong> Anonymous data about your
              interactions with the App (e.g., features accessed, time spent,
              tools viewed) is collected remotely if you consent to analytics
              via the consent banner.
            </li>
            <li>
              <strong>Device & Technical Data:</strong> Information about your
              device, browser, operating system, and IP address (anonymized
              where possible).
            </li>
          </ul>
          <h3>C. Information Stored Locally (on Your Device)</h3>
          <ul>
            <li>
              <strong>Favourites / Tools in Your Toolbox:</strong> Your list of
              favourited tools is stored exclusively in your device&apos;s local
              IndexedDB database. We do not have remote access to this data.
            </li>
            <li>
              <strong>Days Counter Settings:</strong> Your Days Counter date and
              notification preferences (e.g., daily, weekly, monthly, annual
              reminders) are stored locally on your device. We do not have
              remote access to this data unless you create an account and opt
              into notification services.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>
              Provide, operate, improve and maintain the App&apos;s
              functionality.
            </li>
            <li>Authenticate your account and secure access.</li>
            <li>
              Send you notifications (e.g. Days Counter reminders or new content
              updates) only if you explicitly opt-in and consent. You can revoke
              this consent at any time.
            </li>
            <li>
              Improve the App&apos;s content and user experience based on
              anonymous, aggregated analytics (subject to consent).
            </li>
            <li>
              Understand user needs through anonymized and aggregated analysis
              of optional onboarding responses to better serve our community.
            </li>
            <li>Communicate with you regarding your account or inquiries.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2>5. Legal Basis for Processing (GDPR/UK GDPR Specific)</h2>
          <p>
            For users in the European Economic Area (EEA) and United Kingdom:
          </p>
          <ul>
            <li>
              <strong>Consent:</strong> We rely on your explicit consent for:
              (a) using Google Analytics cookies; (b) sending push
              notifications; (c) processing your optional onboarding responses
              (which may include sensitive data). You can withdraw consent at
              any time without affecting the lawfulness of prior processing.
            </li>
            <li>
              <strong>Contractual Necessity:</strong> Processing your account
              data is necessary to provide registered user features under our
              Terms of Service.
            </li>
            <li>
              <strong>Legitimate Interests:</strong> We process anonymous usage
              data and certain technical data for our legitimate interest in
              improving and securing the App, where such interests are not
              overridden by your data protection rights.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Data Storage & Security</h2>
          <ul>
            <li>
              <strong>Local Storage:</strong> Favourites and Days Counter data
              are stored locally in your browser&apos;s IndexedDB. You can clear
              this data at any time via browser settings or the App&apos;s
              &quot;Clear Local Data&quot; function.
            </li>

            <li>
              <strong>Remote Storage:</strong> Account information, consented
              analytics data, and encrypted onboarding responses are stored on
              secure cloud servers operated by third-party providers (e.g.,
              Firebase/Google Cloud Platform) located in the United States.
            </li>
            <li>
              <strong>Encryption:</strong> Onboarding response data is encrypted
              both in transit (using TLS/SSL) and at rest. Identifier columns
              are also encrypted.
            </li>
            <li>
              <strong>Backups:</strong> Regular backups are created and stored
              securely in the cloud for disaster recovery. These are encrypted.
            </li>
          </ul>
          <p>
            We use industry-standard measures to protect your data, but no
            method is 100% secure. In case of a breach, we will notify affected
            users and authorities as required by law.
          </p>
        </section>

        <section>
          <h2>7. Data Sharing & Third-Party Disclosures</h2>
          <p>
            We do not sell, rent, or trade your personal data. We may share
            information with:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> Trusted third parties for
              hosting and backups (e.g., Firebase/Google Cloud), analytics
              (Google Analytics, with consent), and authentication (Email,
              Google, Facebook, Twitter via Firebase). They are contractually
              obligated to handle data confidentially and only for our purposes.
            </li>
            <li>
              <strong>Legal Requirements:</strong> If required by law or valid
              public authority requests.
            </li>
            <li>
              <strong>International Transfers:</strong> Data may be processed
              outside your residence (e.g. in the USA for all remote storage).
              We use safeguards like Standard Contractual Clauses or equivalent
              mechanisms to protect transfers, particularly for EEA/UK users.
            </li>
          </ul>
        </section>

        <section>
          <h2>8. Your Rights & Choices</h2>
          <p>
            Depending on your location (e.g. GDPR, CCPA), you may have rights
            to:
          </p>
          <ul>
            <li>Access, update, or delete your personal data.</li>
            <li>
              Withdraw consent (e.g., for analytics, notifications, onboarding).
            </li>
            <li>Object to processing based on legitimate interests.</li>
            <li>Request data portability.</li>
            <li>
              Opt-out of notifications via App settings or device/browser
              controls.
            </li>
            <li>Manage cookies via the consent banner or browser settings.</li>
          </ul>
          <h3>Delete All Data:</h3>
          <p>You can:</p>
          <ul>
            <li>
              <strong>Locally:</strong>Use the{' '}
              <b>
                <u>
                  <span
                    onClick={() => {
                      setActivity(12)
                    }}>
                    &quot;Clear Your Data&quot;
                  </span>
                </u>
              </b>{' '}
              button in settings.
            </li>
            <li>
              <strong>Remotely:</strong> Request deletion of your account,
              onboarding data, and other remote data by emailing{' '}
              <a href='mailto:data.control@ummi.now'>data.control@ummi.now</a>.
              We will process this within 30 days.
            </li>
          </ul>
          <p>To exercise rights, contact us. We may verify your identity.</p>
        </section>

        <section>
          <h2>9. Data Retention</h2>
          <p>We retain data only as necessary:</p>
          <ul>
            <li>
              <strong>Account Data:</strong> Until account deletion.
            </li>
            <li>
              <strong>Onboarding Data:</strong> Until deletion request or
              account closure.
            </li>
            <li>
              <strong>Analytics Data:</strong> Aggregated/anonymized data may be
              retained indefinitely.
            </li>
            <li>
              <strong>Local Data:</strong> Until you clear it.
            </li>
          </ul>
          <p>We delete data securely upon request or when no longer needed.</p>
        </section>

        <section>
          <h2>10. Potential Legal Issues & Important Disclosures</h2>
          <ul>
            <li>
              <strong>Health & Sensitive Data:</strong> Onboarding may collect
              sensitive data (e.g., addiction details), treated with encryption
              and explicit consent. We do not use it for profiling or medical
              purposes.
            </li>
            <li>
              <strong>Age Restriction:</strong> For 18+ users only. We prohibit
              use by minors. We delete any minor data promptly if discovered.
            </li>
            <li>
              <strong>Global Applicability:</strong> We comply with major laws,
              but you must ensure local compliance.
            </li>
            <li>
              <strong>Third-Party Links & Auth:</strong> Governed by their
              policies; we receive minimal data.
            </li>
            <li>
              <strong>No Medical Relationship:</strong> No doctor-patient
              relationship created.
            </li>
          </ul>
        </section>

        <section>
          <h2>11. Changes to This Privacy Policy</h2>
          <p>
            We may update this policy. We&apos;ll notify registered users of
            material changes via email or in-App notice. Continued use accepts
            changes.
          </p>
          {/* <ul>
						<li>
							For California Residents: See our{' '}
							<a href='#' onClick={handleCCPAClick}>
								&quot;CCPA Privacy Notice&quot;
							</a>{' '}
							for CCPA rights.
						</li>
						<li>For EEA/UK Residents: You can complain to your supervisory authority.</li>
					</ul> */}
        </section>
        <div className='scrollTop btns'>
          <button className='btn' onClick={() => handleScrollTop('smooth')}>
            Back to top
          </button>
          <button className='btn' onClick={() => handleClose()}>
            Close
          </button>
        </div>
      </div>
      <Backdrop className='backdrop' />
    </div>
  )
}
export default PrivacyPolicy
