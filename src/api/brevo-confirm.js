
// /api/confirm.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, email } = req.query;

  if (!token || !email) {
    return res.status(400).json({ message: 'Invalid confirmation link' });
  }

  try {
    // Update contact to confirmed status
    const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        attributes: {
          CONFIRMED: 'true',
          CONFIRMATION_DATE: new Date().toISOString()
        },
        emailBlacklisted: false, // Remove from blacklist
        listIds: [parseInt(process.env.BREVO_NEWSLETTER_LIST_ID)] // Add to newsletter list
      })
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      throw new Error(errorData.message || 'Failed to confirm subscription');
    }

    // Send welcome email using template
    await sendWelcomeEmail(email);

    // Redirect to success page
    res.redirect('/confirmation-success');

  } catch (error) {
    console.error('Confirmation error:', error);
    res.redirect('/confirmation-error');
  }
}

async function sendWelcomeEmail(email) {
  try {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        to: [{ email: email }],
        templateId: parseInt(process.env.BREVO_WELCOME_TEMPLATE_ID) // Your welcome template ID
      })
    });
  } catch (error) {
    console.error('Welcome email error:', error);
  }
}
