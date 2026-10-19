import { useEffect, useRef } from 'react'
import useAppStore from '@store/useAppStore'

import PropTypes from 'prop-types'
import './home.scss'

const display = (activity, id) => {
  return activity === id
}

const Home = ({ children }) => {
  const componentName = 'home'
  const id = -1
  const activity = useAppStore((s) => s.activity)
  const isHome = useRef(false)

  useEffect(() => {
    isHome.current = activity === id
  }, [id, activity])

  if (!display(activity, id)) return

  return (
    <div id={componentName} className={`activity activity-${componentName}`}>
      <section className={componentName}>{children}</section>
    </div>
  )
}
Home.propTypes = {
  children: PropTypes.node,
}

export default Home
