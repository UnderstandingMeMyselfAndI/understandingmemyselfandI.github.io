import { useEffect, useState } from 'react'
import useAppStore from '@/store/useAppStore'
import { activities } from '@/data/config'
import CloseBtn from '@/components/ui/buttons/close/CloseBtn'
import { strings } from '@/data/config'
import PropTypes from 'prop-types'
import { activities } from '@/data/config'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})

import './styles.scss'
import { is } from 'zod/v4/locales'

const Template = () => {
  const name = 'name-to-go-here'
  const id = 999999
  const [open, setOpen] = useState(false)
  const activity = useAppStore((s) => s.activity)
  const isModal = useAppStore((s) => s.isModal)
  const activityID = activities.find((activity) =>
    activity.url === name ? activity.id : null,
  )
  const setIsModal = useAppStore((s) => s.setIsModal)

  useEffect(() => {
    open && setIsModal(activitiesById[id]?.modal)
  }, [open])
  useEffect(() => {
    setOpen(id === activity || !isModal)
  }, [activity, isModal])

  const handleClose = () => setOpen(false)

  return ( open ?
    <div
      id={name}
      className={'activity ' + 'activity-' + name + (open ? ' show' : ' hide')}
    >
      <CloseBtn onClick={handleClose} />
      <section className={name}></section>
    </div> : null
  )
}
Template.propTypes = {}

export default Template
