import { useState, useEffect } from 'react'
import useAppStore from '@/store/useAppStore'
import PropTypes from 'prop-types'
import './styles.scss'
import { id } from 'zod/v4/locales'

const SearchItem = ({ label, id, handleClick }) => {
	const [clicked, setClicked] = useState(false)

	const spv = useAppStore((state) => state.spv)
	// const gae = useAppStore((s) => s.gae) // Google analytics enabled
	

	const clickHandler = () => {
		
		setClicked(true)
		handleClick(id)
	}

	return (
		<div className={'SearchItem' + (clicked && spv ? ' viewed' : '')} onClick={() => clickHandler()}>
			{label}
		</div>
	)
}
SearchItem.propTypes = {
    label: PropTypes.string,
    id: PropTypes.number,
    handleClick: PropTypes.func
}
export default SearchItem