import PropTypes from 'prop-types'
import * as React from 'react'

import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'

import { storeKeys, localStore } from '@data/localStore'
import './styles.css'

const ButtonFavourite = ({ id, className }) => {
  const [favourite, setFavourite] = React.useState(() => {
    // const storedFavourite = localStorage.getItem(`favourite-${id}`);
    const storedVal = localStore.get(storeKeys.favourite, id)
    return storedVal
  })

  const imgClassName = favourite ? 'favourite chosen' : 'favourite'
  const icon = favourite ? StarOutlineOutlinedIcon : StarOutlinedIcon

  React.useEffect(() => {
    const storedFavourite = localStore.get(storeKeys.favourite, id)
    if (storedFavourite !== null) {
      setFavourite(storedFavourite === 'true')
    }
  }, [id])

  const handleClick = (e) => {
    e.stopPropagation()
    const newFavourite = !favourite

    // localStorage.setItem(`favourite-${id}`, newFavourite.toString());
    localStore.set(storeKeys.favourite, id, newFavourite.toString())
    setFavourite(newFavourite)
  }

  return (
    <div
      className={className + ' AccordionItemFavourite '}
      onClick={handleClick}
      aria-label='Add to favourites'
    >
      <div
        dangerouslySetInnerHTML={{ __html: icon }}
        className={imgClassName}
        alt='Favourite Icon'
      />
    </div>
  )
}
ButtonFavourite.propTypes = {
  id: PropTypes.number,
  className: PropTypes.string,
}
ButtonFavourite.displayName = 'Favourite'
export default ButtonFavourite
