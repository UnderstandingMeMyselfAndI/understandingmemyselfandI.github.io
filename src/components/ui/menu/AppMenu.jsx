import { useState } from 'react'
import useAppStore from '@store/useAppStore'
import { usePrivateStore } from '@store/usePrivateStore'
import { activities } from '@data/config'
import { prefetchActivity } from '@components/activity/activityLoaders'
import './appMenu.scss'

export default function AppMenu() {
  const [open, setOpen] = useState(false)

  const showBurgerStack = useAppStore((s) => s.showBurgerStack)

  // Feature flags — encrypted store
  const daysCounterEnabled = usePrivateStore((s) => s.daysCounterEnabled)
  const unitsCalculatorEnabled = usePrivateStore((s) => s.unitsCalculatorEnabled)
  const wheelOfLifeEnabled = usePrivateStore((s) => s.wheelOfLifeEnabled)
  const quizEnabled = usePrivateStore((s) => s.quizEnabled)
  const toolsEnabled = usePrivateStore((s) => s.toolsEnabled)

  // App-level fields — plaintext store
  const setActivity = useAppStore((s) => s.setActivity)
  const activity = useAppStore((s) => s.activity)
  const setIsModal = useAppStore((s) => s.setIsModal)
  const isInstalled = useAppStore((s) => s.isInstalled)
  const isInstallable = useAppStore((s) => s.isInstallable)
  const gae = useAppStore((s) => s.gae)
  const nss = useAppStore((s) => s.nss)

  // Derived, not stored.
  const activeConfig = activity === -1 ? null : (activities.find((a) => a.id === activity) ?? null)
  const showMenu = activity === -1 || !activeConfig?.modal
  const openMenu = activeConfig?.menu ?? false

  const toggleOpen = () => {
    const next = !open
    setOpen(next)

    if (next) {
      activities.forEach((a) => {
        if (a.menu) prefetchActivity(a.url)
      })
    }
  }

  const handleClose = () => setOpen(false)

  const stateMap = {
    daysCounterEnabled,
    unitsCalculatorEnabled,
    wheelOfLifeEnabled,
    quizEnabled,
    toolsEnabled,
    isInstalled,
    isInstallable,
    gae,
    nss,
  }

  const filteredActivities = activities
    .filter((a) => {
      if (!a.conditions || a.conditions.length === 0) return true
      return a.conditions.every((condition) => stateMap[condition.state] === condition.value)
    })
    .sort((a, b) => (a.menuPosition ?? Infinity) - (b.menuPosition ?? Infinity))
  console.log('[AppMenu render]', {
    activity,
    showMenu,
    openMenu,
    showBurgerStack,
    activeConfigUrl: activeConfig?.url ?? null,
  })
  return showMenu ? (
    <div className={'app-menu' + (openMenu ? ' ' : ' hide')}>
      {showBurgerStack && (
        <div className='app-menu__burger-stack' id='burger-button'>
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

      <div className='app-menu__wrapper'>
        <ul className={'app-menu__menu' + (open ? ' open' : ' closed')} id='app-menu__menu' onClick={handleClose}>
          {filteredActivities.map((activityForMenu, i) =>
            activityForMenu.menu ? (
              <li
                className={activityForMenu?.classes}
                key={i}
                onPointerDown={() => prefetchActivity(activityForMenu.url)}
                onFocus={() => prefetchActivity(activityForMenu.url)}
                onClick={() => {
                  if (!activityForMenu.modal) {
                    requestAnimationFrame(() => {
                      const el = document.getElementById(activityForMenu.anchorID)
                      el?.scrollIntoView(true)
                    })
                  }
                  setIsModal(activityForMenu.modal)
                  handleClose()
                  setActivity(activityForMenu.id)
                }}>
                {activityForMenu.title}
              </li>
            ) : null,
          )}
        </ul>
      </div>

      <div className='app-menu__bg' onClick={handleClose}></div>
    </div>
  ) : null
}
