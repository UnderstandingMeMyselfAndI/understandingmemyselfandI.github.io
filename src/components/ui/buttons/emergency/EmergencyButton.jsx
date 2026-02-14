import * as React from 'react'
import { useState, useEffect } from 'react'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import useAppStore from '@/store/useAppStore'
import ToggleButton from '@mui/material/ToggleButton'
import './styles.scss'
const EmergencyButton = React.forwardRef(({ className, ...props }, ref) => {
  const isExpanded = useAppStore((state) => state.isExpanded)
  const setIsExpanded = useAppStore((state) => state.setIsExpanded)
  const scrollStage = parseInt(useAppStore((state) => state.scrollStage))
  const [isEmergency, setIsEmergency] = useState(false)
  const label = ''
  const callback = () => {
    setIsExpanded(false)
  }

  return isExpanded && scrollStage < 2 ? (
    <></>
  ) : (
    <div className='btn emergency'>
      <ToggleButton
        value='check'
        selected={isEmergency}
        onChange={() => setIsEmergency((isEmergency) => !isEmergency)}
      >
        <RocketLaunchIcon className={isEmergency ? 'active' : ''} />
      </ToggleButton>
    </div>
  )
})
EmergencyButton.displayName = 'EmergencyButton'

export default EmergencyButton
