import { useEffect, useState } from 'react'

import Logo from 'ui/logo/Logo'
// import UmmiIcon from 'components/icons/UmmiIcon2.svg'
import "./InstallPWA.scss"
import PropTypes from 'prop-types'
import { strings } from '@/data/config'

const InstallPWA = ({ handleClick, label }) => {
	return (
		<div>
			<button aria-label='install' className='install btn' onClick={handleClick}>
				<Logo classes='small' showText={false} />
				<span>{label}</span>
			</button>
		</div>
	)
}
InstallPWA.propTypes = {
	handleClick: PropTypes.func,
}
export default InstallPWA
    