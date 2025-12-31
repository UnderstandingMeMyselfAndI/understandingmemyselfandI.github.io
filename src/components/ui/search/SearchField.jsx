import { useState } from 'react'
import lingo from '@/data/lingo.js'
import { useInView, useOnInView } from 'react-intersection-observer'
import PropTypes from 'prop-types'
import './styles.scss'
function searchLingo(query) {
    if (!query || query.trim() === '') {
        return lingo
    }

	const lowerQuery = query.toLowerCase().trim()

	return lingo
		.filter((item) => item.title.toLowerCase().includes(lowerQuery))
		.sort((a, b) => {
			const aTitle = a.title.toLowerCase()
			const bTitle = b.title.toLowerCase()
			if (aTitle.startsWith(lowerQuery) && !bTitle.startsWith(lowerQuery)) return -1
			if (!aTitle.startsWith(lowerQuery) && bTitle.startsWith(lowerQuery)) return 1
			return 0
		})
}

const SearchField = ({ handleClick }) => {
	const el = document.getElementById('search')
	const [searchTerm, setSearchTerm] = useState('')
	const [inView, setInView] = useState(false)

	const filteredLingo = searchLingo(searchTerm)

	const inViewRef = useOnInView(
		(inView) => {
			if (inView) {
				// Do something with the element that came into view
				// console.log('Element is in view', entry.target)
				setInView(true)
			} else {
				// console.log('Element left view', entry.target)
				setInView(false)
			}
		},
		{
			/* Optional options */
			threshold: 0,
			rootMargin: '-23% 0% -78% 0%',
		}, // Optional IntersectionObserver options
	)
	const handleChange = (e) => {
		setSearchTerm(e.target.value)
		if (e.target.value !== '') {
			el.scrollInToView({ behavior: 'smooth', block: 'start' })
		}
	}

	return (
		<div className='lingo-field ' ref={inViewRef} id='search'>
			{/* <div>
				<input
					className={'floating' + (inView ? ' show' : ' ')}
					type='text'
					placeholder='Search Lingo & Phrases...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div> */}
			<input className='' type='text' placeholder='Search Lingo & Phrases...' value={searchTerm} onChange={handleChange} />
			<div className='lingo-list'>
				{filteredLingo.map((item) => (
					<div key={item.id} onClick={() => handleClick(item.id)}>
						{item.title}
					</div>
				))}
				{filteredLingo.length === 0 && <div className='no-results'>No results found</div>}
			</div>
		</div>
	)
}
SearchField.propTypes = {
	handleClick:PropTypes.func.isRequired,
}
export default SearchField
