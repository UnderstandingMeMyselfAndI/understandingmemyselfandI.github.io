import parse from 'html-react-parser'
import { activities, strings } from '@/data/config'

import './styles.scss'

const CCPAPrivacyPolicy = () => {
  const name = 'privacyPolicy'

  // const content = strings.activity.find(activity => activity.name === name) || null;
  // if (content === null) {
  // 	console.warn(`No content found for activity "${name}"`);
  // }
  return (
    <div className='privacyPolicy'>
      <h1>Privacy Policy</h1>
      <div className='last-updated'>Last Updated: 21.12.2025</div>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to the <strong>[App Name]</strong> Progressive Web Application
          (the &quot;App&quot;). This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our App,
          which provides informational resources and tools related to Cognitive
          Behavioral Therapy (CBT), Acceptance and Commitment Therapy (ACT),
          Dialectical Behavior Therapy (DBT), Rational Emotive Behavior Therapy
          (REBT), and SMART Recovery.
        </p>

        <p>
          Please read this policy carefully. By using the App, you consent to
          the data practices described. If you do not agree, please do not use
          the App.
        </p>

        <div className='important-notice'>
          <strong>Important Notice:</strong> This App provides support
          information only and is not a substitute for professional medical
          advice, diagnosis, or treatment. Always seek the advice of your
          physician or qualified mental health provider with any questions you
          may have regarding a medical or psychological condition. This App is
          intended for users aged 18 and over due to the nature of content
          surrounding addiction and recovery.
        </div>
      </section>

      <section>
        <h2>2. Data Controller & Contact Information</h2>
        <p>
          The data controller for your personal data is{' '}
          <strong className='ummi'>Ummi</strong>.
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
            account, we collect your authentication identifier (e.g., email
            address, social media profile link via Firebase Authentication for
            Google, Facebook, or Twitter) and your chosen password.
          </li>
          <li>
            <strong>Onboarding Information (Optional):</strong> If you choose to
            participate in onboarding, we collect your responses to questions
            about your reason for visiting, circumstances in addiction recovery,
            drug of choice, use of other support services, and information
            preferences. This data is stored separately from your account
            credentials.
          </li>
          <li>
            <strong>Days Counter Data:</strong> The date and time you set for
            the Days Counter feature, stored locally on your device.
          </li>
          <li>
            <strong>Communication Data:</strong> If you contact us, we collect
            the contents of your message.
          </li>
        </ul>

        <h3>B. Information Collected Automatically</h3>
        <ul>
          <li>
            <strong>Usage Data:</strong> Anonymous data about your interactions
            with the App (e.g., features accessed, time spent, tools viewed).
            This is collected remotely if you consent to analytics.
          </li>
          <li>
            <strong>Device & Technical Data:</strong> Information about your
            device, browser, operating system, and IP address (anonymized where
            possible).
          </li>
        </ul>

        <h3>C. Information Stored Locally (on Your Device)</h3>
        <ul>
          <li>
            <strong>Favourites:</strong> Your list of favourited tools is stored
            exclusively in your device&apos;s local IndexedDB database. We do
            not have remote access to this data unless you create an account and
            choose to sync it (if such a feature is offered).
          </li>
          <li>
            <strong>Days Counter Settings:</strong> Your Days Counter date and
            notification preferences are stored locally.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, operate, and maintain the App&apos;s functionality.</li>
          <li>Authenticate your account and secure access.</li>
          <li>
            Send you notifications (daily, weekly, monthly, annual reminders for
            Days Counter, or new content updates) only if you explicitly opt-in.
          </li>
          <li>
            Improve the App&apos;s content and user experience based on
            anonymous, aggregated analytics (subject to consent).
          </li>
          <li>
            Understand user needs through anonymized and aggregated analysis of
            optional onboarding responses to better serve our community.
          </li>
          <li>Communicate with you regarding your account or inquiries.</li>
          <li>Comply with legal obligations.</li>
        </ul>
      </section>

      <section>
        <h2>5. Legal Basis for Processing (GDPR/UK GDPR Specific)</h2>
        <p>For users in the European Economic Area (EEA) and United Kingdom:</p>
        <ul>
          <li>
            <strong>Consent:</strong> We rely on your consent for: (a) using
            Google Analytics cookies; (b) sending push notifications; (c)
            processing your optional onboarding responses. You can withdraw
            consent at any time.
          </li>
          <li>
            <strong>Contractual Necessity:</strong> Processing your account data
            is necessary to provide you with the registered user features under
            our Terms of Service.
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
            <strong>Local Storage:</strong> Favourites and Days Counter data are
            stored locally in your browser&apos;s IndexedDB. You can clear this
            data at any time via your browser settings or the App&apos;s
            &quot;Clear Local Data&quot; function.
          </li>
          <li>
            <strong>Remote Storage:</strong> Account information, consented
            analytics data, and encrypted onboarding responses are stored on
            secure cloud servers operated by third-party providers (e.g.,
            Firebase).
          </li>
          <li>
            <strong>Encryption:</strong> Onboarding response data is encrypted
            both in transit (using TLS/SSL) and at rest in our databases.
            Identifier columns for this data are also encrypted.
          </li>
          <li>
            <strong>Backups:</strong> Regular backups are created and stored
            securely in the cloud for disaster recovery purposes. These backups
            are also encrypted.
          </li>
        </ul>
        <p>
          While we use industry-standard measures to protect your data, no
          electronic transmission or storage method is 100% secure. We cannot
          guarantee absolute security.
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
            <strong>Service Providers:</strong> Trusted third parties who host
            our App (e.g., Firebase/Google Cloud Platform), provide analytics
            (Google Analytics, only with consent), and facilitate authentication
            (Google, Facebook, Twitter via Firebase). These parties are bound by
            contractual obligations to handle data confidentially.
          </li>
          <li>
            <strong>Legal Requirements:</strong> If required to do so by law or
            in response to valid requests by public authorities.
          </li>
          <li>
            <strong>International Transfers:</strong> Data may be processed and
            stored in countries outside your country of residence (e.g., the
            USA). We ensure appropriate safeguards are in place, such as relying
            on the provider&apos;s Privacy Shield certification (where
            applicable) or Standard Contractual Clauses approved by the European
            Commission.
          </li>
        </ul>
      </section>

      <section>
        <h2>8. Your Rights & Choices</h2>
        <p>
          Depending on your location, you may have rights under laws like the
          GDPR, UK GDPR, or CCPA, including the right to:
        </p>
        <ul>
          <li>Access, Update, or Delete your personal data.</li>
          <li>
            Withdraw Consent at any time for processing based on consent (e.g.,
            analytics, notifications).
          </li>
          <li>Object to certain processing based on legitimate interests.</li>
          <li>
            Data Portability. Request a copy of your data in a structured
            format.
          </li>
          <li>
            Opt-Out of Notifications. Adjust your device or browser settings, or
            use the &quot;disable notifications&quot; function within the App.
          </li>
          <li>
            Manage Cookies. Accept or reject non-essential cookies via the
            initial consent barrier. You can also manage cookies through your
            browser settings.
          </li>
        </ul>

        <h3>Delete All Data:</h3>
        <p>You can:</p>
        <ul>
          <li>
            <strong>Locally:</strong> Clear your browser&apos;s IndexedDB and
            site data to delete favourites and Days Counter settings.
          </li>
          <li>
            <strong>Remotely:</strong> Request deletion of your account and
            associated remote data by contacting us at{' '}
            <strong>[Your Contact Email]</strong>. This will delete your account
            information and, upon request, your encrypted onboarding responses.
          </li>
        </ul>
      </section>

      <section>
        <h2>9. Data Retention</h2>
        <p>We retain your personal data only as long as necessary:</p>
        <ul>
          <li>
            <strong>Account Data:</strong> Until you delete your account.
          </li>
          <li>
            <strong>Onboarding Data:</strong> Until you delete your account or
            request its specific deletion.
          </li>
          <li>
            <strong>Analytics Data:</strong> Aggregated and anonymized data may
            be retained indefinitely.
          </li>
          <li>
            <strong>Local Data (Favourites/Days Counter):</strong> Until you
            clear your browser data or use the App&apos;s clear data function.
          </li>
        </ul>
      </section>

      <section>
        <h2>10. Potential Legal Issues & Important Disclosures</h2>
        <ul>
          <li>
            <strong>Health & Sensitive Data:</strong> Onboarding questions may
            involve information about addiction recovery, which could be
            classified as special category/sensitive data under regulations like
            the GDPR. We treat this data with heightened security (encryption)
            and process it only with your explicit, optional consent. We
            minimize collection and do not use it for profiling.
          </li>
          <li>
            <strong>Age Restriction:</strong> The App is designed for users 18
            years of age and older. We do not knowingly collect data from
            minors. If we learn we have, we will delete it promptly.
          </li>
          <li>
            <strong>Global Applicability:</strong> We strive to comply with
            major privacy frameworks (GDPR, CCPA, etc.). However, users
            worldwide are responsible for ensuring their use of the App complies
            with local laws.
          </li>
          <li>
            <strong>Third-Party Links & Auth:</strong> The App uses third-party
            authentication (Google, Facebook, Twitter). Your use of these
            services is governed by their respective privacy policies. We
            receive only the basic profile information you consent to share via
            these platforms.
          </li>
          <li>
            <strong>No Medical Relationship:</strong> Use of this App does not
            create a doctor-patient or therapist-client relationship. Data
            collected is for app functionality and improvement, not for
            healthcare provision.
          </li>
        </ul>
      </section>

      <section>
        <h2>11. Changes to This Privacy Policy</h2>
        <p>
          We may update this policy periodically. The &quot;Last Updated&quot;
          date will be revised. We will notify registered users of any material
          changes via email or an in-App notice. Your continued use after
          changes constitutes acceptance.
        </p>

        <ul>
          <li>
            For California Residents: Please see our supplementary &quot;CCPA
            Privacy Notice&quot; [Link] for details on your rights under the
            California Consumer Privacy Act.
          </li>
          <li>
            For EEA/UK Residents: You have the right to lodge a complaint with a
            supervisory authority in your country of residence.
          </li>
        </ul>
      </section>
    </div>
  )
}
export default CCPAPrivacyPolicy
