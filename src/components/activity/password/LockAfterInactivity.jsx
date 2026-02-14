import { useEffect } from 'react'
import { useDrinkLogStore } from '@/store/drinkLogStore'
import PropTypes from 'prop-types'
const LockAfterInactivity = ({ onSuccess }) => {
  const isUnlocked = useDrinkLogStore()
  const lock = useDrinkLogStore((state) => state.lock)
  useEffect(() => {
    if (isUnlocked) {
      const timer = setTimeout(
        () => {
          lock()
        },
        5 * 60 * 1000,
      ) // 5 minutes
      return () => clearTimeout(timer)
    }
  }, [isUnlocked, lock])

  return null
}

LockAfterInactivity.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}
export default LockAfterInactivity
