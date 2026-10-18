import { useState } from 'react'
import useAppStore from '@store/useAppStore'
import { activities } from '@data/config.js'
import { prefetchActivity } from '@activity/activityLoaders'
import './appMenu.scss'

export default function AppMenu() {
  const [open, setOpen] = useState(false)

  const showBurgerStack = useAppStore((s) => s.showBurgerStack)
  const daysCounterEnabled = useAppStore((s) => s.daysCounterEnabled)
  const unitsCalculatorEnabled = useAppStore((s) => s.unitsCalculatorEnabled)
  const wheelOfLifeEnabled = useAppStore((s) => s.wheelOfLifeEnabled)
  const quizEnabled = useAppStore((s) => s.quizEnabled)
  const toolsEnabled = useAppStore((s) => s.toolsEnabled)
  const smoothScrollEnabled = useAppStore((s) => s.smoothScrollEnabled)

  const setActivity = useAppStore((s) => s.setActivity)
  const activity = useAppStore((s) => s.activity)
  const setIsModal = useAppStore((s) => s.setIsModal)
  const isInstalled = useAppStore((s) => s.isInstalled)
  const isInstallable = useAppStore((s) => s.isInstallable)
  const gae = useAppStore((s) => s.gae)
  const nss = useAppStore((s) => s.nss)

  // Derived from `activity` — no state, no effect.
  // If activity is -1 (home), or its config isn't a modal, show the menu bar.
  // If activity points to a non-modal activity, show the menu bar too.
  // If activity points to a modal activity, hide the menu bar.
  const activeConfig = activity === -1 ? null : (activities.find((a) => a.id === activity) ?? null)
  const showMenu = activity === -1 || !activeConfig?.modal
  const openMenu = activeConfig?.menu ?? false

  const toggleOpen = () => {
    const next = !open
    setOpen(next)

    // Menu is opening — user intent to interact. Warm the chunks for every
    // visible menu item now, so any subsequent tap is instant. This is the
    // best prefetch moment on mobile: scan time is the lead time.
    if (next) {
      activities.forEach((a) => {
        if (a.menu) prefetchActivity(a.url)
      })
    }
  }

  const handleClose = () => setOpen(false)

  // Trivial computation — no manual memo, so React Compiler can optimise.
  const stateMap = {
    daysCounterEnabled,
    unitsCalculatorEnabled,
    wheelOfLifeEnabled,
    quizEnabled,
    toolsEnabled,
    smoothScrollEnabled,
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
