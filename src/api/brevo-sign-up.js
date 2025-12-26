// /api/signup.js (Next.js) or Express route
export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' })
	}

	const { email } = req.body

	if (!email) {
		return res.status(400).json({ message: 'Email is required' })
	}

	try {
		// Add contact to Brevo marketing list
		const response = await fetch('https://api.brevo.com/v3/contacts', {
			method: 'POST',
			headers: {
				'accept': 'application/json',
				'api-key': process.env.BREVO_API_KEY,
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				listIds: [2], // Replace with your marketing list ID
				updateEnabled: true, // Update if contact already exists
			}),
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message || 'Failed to subscribe')
		}

		res.status(200).json({
			message: 'Successfully subscribed!',
			success: true,
		})
	} catch (error) {
		console.error('Signup error:', error)
		res.status(500).json({
			message: 'Subscription failed. Please try again.',
			error: error.message,
		})
	}
}
