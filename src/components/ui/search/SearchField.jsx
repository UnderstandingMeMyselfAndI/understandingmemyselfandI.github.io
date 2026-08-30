import { useState, forwardRef } from 'react'

import { useOnInView } from 'react-intersection-observer'
import SearchItem from './SearchItem'
import lingo from '@data/lingo.js'
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

const SearchField = forwardRef(({ classes, handleClick }, ref) => {
  const el = document.getElementById('search')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLingo = searchLingo(searchTerm)

  const inViewRef = useOnInView(
    (inView) => {
      if (inView) {
        // Do something with the element that came into view
        // console.log('Element is in view', entry.target)
      } else {
        // console.log('Element left view', entry.target)
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
    console.log('handleChange', e.target.value)

    if (e.target.value !== '') {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div id='search' className='search-field' ref={inViewRef}>
      <input
        className={'search-input-field' + (classes ? ' ' + classes : '')}
        type='text'
        placeholder='Search Lingo & Phrases...'
        value={searchTerm}
        onChange={handleChange}
        id='lingo-search'
        name='lingo-search'
      />
      <div className='search-list' ref={ref}>
        {filteredLingo.map((item) => (
          <SearchItem key={item.id} label={item.title} id={item.id} handleClick={handleClick} />
        ))}
        {filteredLingo.length === 0 && <div className='no-results'>No results found</div>}
      </div>
    </div>
  )
})

SearchField.propTypes = {
  handleClick: PropTypes.func.isRequired,
  classes: PropTypes.string,
}

SearchField.displayName = 'SearchField'
export default SearchField
