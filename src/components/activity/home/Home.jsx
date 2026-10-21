import { useEffect, useRef } from 'react'
import useAppStore from '@store/useAppStore'
import PropTypes from 'prop-types'
import { activities } from '@data/config.js'
import './home.scss'

const display = (activity) => {
  const ids = [-1, 13]
  return ids.includes(activity)
}

const Home = ({ children }) => {
  const componentName = 'home'
  const id = -1

  const activity = useAppStore((s) => s.activity)
  const anchorID = activities.find((data) => {
    if (data.id === activity) return data.anchorID
  })

  if (!display(activity)) return

  return (
    <div id={componentName} className={`activity activity-${componentName}`}>
      {children}
    </div>
  )
}
Home.propTypes = {
  children: PropTypes.node,
}

export default Home
