import { AgeGate } from '@jmeirinkmarimed/age-gate'
import Backdrop from '../backdrop/Backdrop'
import './styles.scss'

const UmmiAgeGate = () => {
	const clearAndRedirect = () => {
		localStorage.clear()
		window.location = 'https://google.com'
	}
	const checkAgeInStorage = () => {}
	checkAgeInStorage()
	// setTimeout(checkAgeInStorage, 300000) // five minutes
	window.addEventListener('storage', function (e) {
		if (e.key === 'ageVerified') {
			const ageVerified = localStorage.getItem('ageVerified')
			if (ageVerified && ageVerified !== true) {
				clearAndRedirect()
			}
			// if (!ageVerified) clearAndRedirect()
		}
	})
	return (
		<AgeGate
			minAge={18}
			confirmationType='yesNo'
			headerText='Due to the sensitive nature of some topics and content, you need to be 18 or older to use this app.'
			subHeaderText='Are you 18 years of age or older.'
			logo='/icons/UmmiIcon2.svg'
			logoWidth='120px'
			backgroundColor='#000000'
			textColor='#ffffff'
			buttonColor='#ffffff'
			buttonTextColor='#000000'
			buttonHoverColor='#e6e6e6'
			buttonHoverTextColor='#000000'
			confirmButtonText='Enter'
			fontFamily='Plus Jakarta Sans'
			backgroundImage={'/bgs/ag.avif'}
		/>
	)
}

export default UmmiAgeGate