import { useEffect, useMemo, useState } from 'react'
import useAppStore from '@/store/useAppStore'
import { activities } from '@/data/config'
// import requestWakeLock from '@/js/utils/WakeLock'
import { strings } from '@/data/config'
import { sanitizeStringForUrl, setBrowserHistory } from '@/js/utils.js'
import './styles.scss'
export const MenuOpenIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' height='40px' width='40px' viewBox='0 -960 960 960' fill='#ffffff'>
    <path d='M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z' />
  </svg>
)
export const MenuCloseIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' height='40px' viewBox='0 -960 960 960' width='40px' fill='#ffffff'>
    <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
  </svg>
)
// TODO: #19 Implement URLS and routing
export default function AppMenu() {
  // const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(true)
  const [openMenu, setOpenMenu] = useState(false)

  const showBurgerStack = useAppStore((state) => state.showBurgerStack)

  const daysCounterEnabled = useAppStore((state) => state.daysCounterEnabled)
  const unitsCalculatorEnabled = useAppStore((s) => s.unitsCalculatorEnabled)

  const setActivity = useAppStore((state) => state.setActivity)
  const activity = useAppStore((state) => state.activity)

  const setIsModal = useAppStore((state) => state.setIsModal)

  const isInstalled = useAppStore((state) => state.isInstalled)
  const isInstallable = useAppStore((state) => state.isInstallable)

  const gae = useAppStore((s) => s.gae) // Google analytics enabled
  const nss = useAppStore((s) => s.nss) // subscribed to newsletter

  const toggleOpen = () => {
    setOpen(!open)
    // requestWakeLock() TODO The emeroy useage of this needs checking
  }
  const handleClose = (obj) => {
    setOpen(false)
  }

  function findActivityObj(id) {
    const obj = activities.find((a) => (parseInt(a.id) === parseInt(id) ? id : null))
    return obj
  }

  useEffect(() => {
    const obj = activities.find((a) => (parseInt(a.id) === parseInt(activity) ? activity : null))
    const showMenu = activity === -1 ? true : obj.modal ? false : true
    setShowMenu(showMenu)
    if (obj) {
      setOpenMenu(obj.menu)
    }
  }, [activity])

  const filteredActivities = useMemo(() => {
    const stateMap = {
      daysCounterEnabled,
      unitsCalculatorEnabled,
      isInstalled,
      isInstallable,
      gae,
      nss,
    }

    return activities
      .filter((activity) => {
        if (!activity.conditions || activity.conditions.length === 0) {
          return true // Always show items without conditions
        }
        return activity.conditions.every((condition) => {
          return stateMap[condition.state] === condition.value
        })
      })
      .sort((a, b) => {
        const posA = a.menuPosition ?? Infinity
        const posB = b.menuPosition ?? Infinity
        return posA - posB
      })
  }, [daysCounterEnabled, unitsCalculatorEnabled, isInstalled, isInstallable, gae, nss])

  return showMenu ? (
    <div className={'AppMenu' + (openMenu ? ' ' : ' hide')}>
      {showBurgerStack && (
        <div className='burger-stack' id='burger-button'>
          <input
            type='checkbox'
            id='checkbox1'
            value={open}
            checked={open}
            className='checkbox1 visuallyHidden'
            onChange={toggleOpen}
          />
          <label htmlFor='checkbox1'>
            <div className='hamburger hamburger1'>
              <span className='bar bar1'></span>
              <span className='bar bar2'></span>
              <span className='bar bar3'></span>
              <span className='bar bar4'></span>
            </div>
          </label>
        </div>
      )}
      <ul className={open ? ' open' : ' closed'} id='app-menu' onClick={handleClose}>
        {filteredActivities.map((activityForMenu, i) => {
          return activityForMenu.menu ? (
            <li
              className={activityForMenu?.classes}
              key={i}
              onClick={() => {
                if (!activityForMenu.modal) {
                  requestAnimationFrame(() => {
                    const el = document.getElementById(activityForMenu.anchorID)
                    el.scrollIntoView(true)
                  })
                }
                setIsModal(activityForMenu.modal)
                handleClose()
                setActivity(activityForMenu.id)
              }}>
              {activityForMenu.title}
            </li>
          ) : null
        })}
      </ul>
      <div className='app-nemu-bg' onClick={handleClose}></div>
    </div>
  ) : null
}
