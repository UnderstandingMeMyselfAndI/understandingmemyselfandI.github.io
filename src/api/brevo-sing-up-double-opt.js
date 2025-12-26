// /api/signup-double-optin.js
import crypto from 'crypto'

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' })
	}

	const { email, firstName } = req.body

	if (!email) {
		return res.status(400).json({ message: 'Email is required' })
	}

	try {
		// Generate confirmation token
		const confirmationToken = crypto
			.createHash('sha256')
			.update(email + process.env.SECRET_KEY + Date.now())
			.digest('hex')

		// Store token temporarily (you might want to use a database)
		// For this example, we'll encode it in the confirmation URL

		// Create contact in Brevo (initially unconfirmed)
		const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
			method: 'POST',
			headers: {
				'accept': 'application/json',
				'api-key': process.env.BREVO_API_KEY,
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				attributes: {
					FIRSTNAME: firstName || '',
					CONFIRMATION_TOKEN: confirmationToken,
					SIGNUP_DATE: new Date().toISOString(),
					CONFIRMED: 'false',
				},
				emailBlacklisted: true, // Blacklist until confirmed
				updateEnabled: true,
			}),
		})

		if (!contactResponse.ok) {
			const errorData = await contactResponse.json()
			throw new Error(errorData.message || 'Failed to create contact')
		}

		// Send confirmation email using template
		await sendConfirmationEmail(email, firstName, confirmationToken)

		res.status(200).json({
			message: 'Confirmation email sent successfully!',
			success: true,
		})
	} catch (error) {
		console.error('Signup error:', error)
		res.status(500).json({
			message: 'Signup failed. Please try again.',
			error: error.message,
		})
	}
}

async function sendConfirmationEmail(email, firstName, token) {
	const confirmationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/confirm?token=${token}&email=${encodeURIComponent(email)}`

	try {
		const response = await fetch('https://api.brevo.com/v3/smtp/email', {
			method: 'POST',
			headers: {
				'accept': 'application/json',
				'api-key': process.env.BREVO_API_KEY,
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				to: [
					{
						email: email,
						name: firstName || '',
					},
				],
				templateId: parseInt(process.env.BREVO_CONFIRMATION_TEMPLATE_ID), // Your template ID
				params: {
					FIRSTNAME: firstName || 'there',
					CONFIRMATION_URL: confirmationUrl,
				},
			}),
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(`Failed to send confirmation email: ${errorData.message}`)
		}
	} catch (error) {
		console.error('Confirmation email error:', error)
		throw error
	}
}
