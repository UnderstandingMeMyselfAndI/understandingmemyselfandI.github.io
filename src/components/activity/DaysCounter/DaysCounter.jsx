import { useState, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import './styles.scss'
import AddIcon from '@mui/icons-material/Add'
import CloseBtn from '../../ui/buttons/close/CloseBtn'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
// import BackdropParallax from '../../ui/backdrop/Backdrop';
import parse from 'html-react-parser'
import useAppStore from '@/store/useAppStore'

import Dialog from 'components/ui/dialog/Dialog'
import { activities } from '@/data/config'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})
const DaysCounter = () => {
  const name = 'Days Counter'
  const id = 2
  // const activity = useAppStore(state => state.activity);
  const setActivity = useAppStore((state) => state.setActivity)

  const { activity } = useAppStore(
    useShallow((state) => ({ activity: state.activity })),
  )

  const [open, setOpen] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogIndex, setDialogIndex] = useState(-1)
  const [editingDateIndex, setEditingDateIndex] = useState(-1)
  const setIsModal = useAppStore((s) => s.setIsModal)
  const isModal = useAppStore((s) => s.isModal)
  const handleClose = () => {
    setOpen(false)
    setActivity(-1)
  }
  const handleCloseDialog = () => {
    setShowDialog(false)
  }
  useEffect(() => {
    open && setIsModal(activitiesById[id]?.modal)
  }, [open])

  useEffect(() => {
    setOpen(activity === id)
  }, [activity, isModal, id, setOpen])
  const getInitialDates = () => {
    try {
      const saved = localStorage.getItem('daysCounterDates')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  }

  const [dates, setDates] = useState(getInitialDates())
  const [currentTimes, setCurrentTimes] = useState({})

  const getTenYearsAgo = () => {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 10)
    return date.toISOString().slice(0, 16)
  }

  const getToday = () => {
    return new Date().toISOString().slice(0, 16)
  }

  useEffect(() => {
    try {
      localStorage.setItem('daysCounterDates', JSON.stringify(dates))
    } catch (e) {
      console.error('Failed to save to localStorage', e)
    }
  }, [dates])

  useEffect(() => {
    const now = Date.now()
    const newTimes = {}
    dates.forEach((date, index) => {
      if (date.selectedDate) {
        const diff = now - new Date(date.selectedDate).getTime()
        newTimes[index] = {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor(diff / (1000 * 60 * 60)),
          minutes: Math.floor(diff / (1000 * 60)),
        }
      }
    })
    setCurrentTimes(newTimes)
  }, [dates])

  const addDate = () => {
    if (dates.length < 3) {
      setDates([...dates, { id: Date.now(), selectedDate: null, label: '' }])
    }
  }

  const updateDate = (index, dateValue, labelValue) => {
    const newDates = [...dates]
    newDates[index] = {
      ...newDates[index],
      selectedDate: dateValue,
      label: labelValue,
    }
    setDates(newDates)
    setEditingDateIndex(-1)
  }

  const deleteDate = (index) => {
    setDates(dates.filter((_, i) => i !== index))
    setShowDialog(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const returnDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    const arr = returnDate.split(' ')
    const formattedDate = `<span>${arr[0]} ${arr[1]} ${arr[2]}</span> <span>${arr[3]} ${arr[4]}${arr[5]}</span>`

    return formattedDate
  }

  const handleDateClick = (index) => {
    setEditingDateIndex(index)
  }
  // if (!showDaysCounter) {
  // 	// handleClose()
  // 	setActivity(-1)
  // 	return null
  // }
  return (
    <section
      className={
        'activity days-counter-activity fixed' + (open ? ' show' : '')
      }>
      <div
        className={
          'days-counter-wrapper ' +
          (dates.length === 2 ? ' full' : '') +
          (open ? ' open' : '')
        }>
        <div className='days-counter-wrap'>
          <div className='days-counter-inner'>
            <CloseBtn classes='days-counter-close-btn' onClick={handleClose} />
            {dates.length > 0 && (
              <header>
                <h3>Days Counter</h3>
              </header>
            )}
            {showDialog && (
              <Dialog
                show={showDialog}
                title='Delete Date'
                instruction='Are you sure you want to delete this date?'
                onConfirm={() => deleteDate(dialogIndex)}
                onCancel={() => handleCloseDialog()}
              />
            )}
            <div
              className={
                'days-counter-container' + (dates.length === 2 ? ' full' : '')
              }>
              {dates.length === 0 && (
                <div className='days-counter-empty-state'>
                  <h3>Days Counter</h3>
                  <div className='days-counter-empty-title'>
                    Tap to add a date
                  </div>

                  <button
                    onClick={() => addDate()}
                    className='days-counter-add-another-btn'>
                    ({dates.length}/2)
                  </button>
                </div>
              )}
              {dates.length > 0 && (
                <div
                  className={
                    'days-counter-list' + (dates.length === 2 ? ' full' : '')
                  }>
                  {dates.map((date, index) => (
                    <div key={date.id} className='days-counter-card'>
                      <button
                        onClick={() => {
                          setDialogIndex(index)
                          setShowDialog(true)
                        }}
                        className='days-counter-delete-btn'
                        title='Delete'>
                        <DeleteForeverIcon />
                      </button>

                      {date.selectedDate ? (
                        <div className='days-counter-values'>
                          <div className='days-counter-stat'>
                            <span className='value'>
                              {currentTimes[index] &&
                              currentTimes[index].days !== undefined
                                ? currentTimes[index].days.toLocaleString()
                                : 0}
                            </span>
                            <span className='label'>days</span>
                          </div>
                          <div className='days-counter-stat-group'>
                            <div className='days-counter-stat'>
                              <span className='value'>
                                {currentTimes[index] &&
                                currentTimes[index].hours !== undefined
                                  ? currentTimes[index].hours.toLocaleString()
                                  : 0}
                              </span>
                              <span className='label'>hours</span>
                            </div>
                            <div className='days-counter-stat'>
                              <span className='value'>
                                {currentTimes[index] &&
                                currentTimes[index].minutes !== undefined
                                  ? currentTimes[index].minutes.toLocaleString()
                                  : 0}
                              </span>
                              <span className='label'>minutes</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className='days-counter-stat-group-new'>
                          <div className='days-counter-stat'>
                            <span className='value'>0</span>
                          </div>
                        </div>
                      )}
                      <div className='days-counter-card-date'>
                        <div className='title'>
                          <input
                            id={`Days-Counter-Title-${index}`}
                            type='text'
                            placeholder='Tap to set a title'
                            value={date.label}
                            onChange={(e) =>
                              updateDate(
                                index,
                                date.selectedDate,
                                e.target.value,
                              )
                            }
                            className='days-counter-title-input'
                          />
                        </div>
                        <div className='days-counter-selected-date'>
                          {date.selectedDate && editingDateIndex !== index ? (
                            <span
                              className='days-counter-date-display'
                              onClick={() => handleDateClick(index)}
                              style={{ cursor: 'pointer' }}>
                              {parse(formatDate(date.selectedDate))}
                            </span>
                          ) : (
                            <></>
                          )}
                          {!date.selectedDate || editingDateIndex === index ? (
                            <input
                              type='datetime-local'
                              value={date.selectedDate || ''}
                              onChange={(e) =>
                                updateDate(index, e.target.value, date.label)
                              }
                              onBlur={() => setEditingDateIndex(-1)}
                              min={getTenYearsAgo()}
                              max={getToday()}
                              className='days-counter-date-input'
                              autoFocus={editingDateIndex === index}
                            />
                          ) : (
                            <> </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {dates.length > 0 && dates.length < 2 && (
                <button
                  onClick={() => addDate()}
                  className='days-counter-add-another-btn'>
                  ({dates.length}/2)
                </button>
              )}
            </div>
            <div className='days-counter-note-container'>
              <div className='days-counter-note'>
                <p>
                  * All dates are saved <u>only on your device</u> to ensure
                  your privacy.
                </p>

                <p>Disble controls available in settings.</p>
              </div>
            </div>
            {/* <div className='days-counter-backdrop'>
          {/* <BackdropParallax initialImageId={4} initialDelay={0} interval={6000} parallaxStrength={0} /> 
        </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DaysCounter
