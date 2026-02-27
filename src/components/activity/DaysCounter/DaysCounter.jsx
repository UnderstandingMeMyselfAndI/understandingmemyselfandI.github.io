import { useState, useEffect, useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'
import './styles.scss'
import AddIcon from '@mui/icons-material/Add'
import CloseBtn from '../../ui/buttons/close/CloseBtn'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
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
  const setActivity = useAppStore((state) => state.setActivity)
  const { activity } = useAppStore(useShallow((state) => ({ activity: state.activity })))
  const setIsModal = useAppStore((s) => s.setIsModal)
  const isModal = useAppStore((s) => s.isModal)

  const [open, setOpen] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogIndex, setDialogIndex] = useState(-1)
  const [editingDateIndex, setEditingDateIndex] = useState(-1)
  const [currentIndex, setCurrentIndex] = useState(0) // current slide index
  const maxNumDates = 6

  // Touch handling for swipe
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const minSwipeDistance = 50

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // swipe left -> next
        goToNext()
      } else {
        // swipe right -> prev
        goToPrev()
      }
    }
    // Reset
    touchStartX.current = 0
    touchEndX.current = 0
  }

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, dates.length - 1))
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const goToIndex = (index) => {
    setCurrentIndex(index)
  }

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

  // Adjust current index when dates change (e.g., after delete)
  useEffect(() => {
    if (currentIndex >= dates.length) {
      setCurrentIndex(Math.max(dates.length - 1, 0))
    }
  }, [dates, currentIndex])

  const addDate = () => {
    if (dates.length < maxNumDates) {
      setDates([...dates, { id: Date.now(), selectedDate: null, label: '' }])
      // Optionally go to the new date
      setCurrentIndex(dates.length)
    }
  }
  const updateDate = (index, dateValue, labelValue, isDateChange = false) => {
    const newDates = [...dates]
    newDates[index] = { ...newDates[index], selectedDate: dateValue, label: labelValue }
    setDates(newDates)
    if (isDateChange) setEditingDateIndex(-1)
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

  if (!open) return null

  return (
    <section className={`activity days-counter-activity fixed ${open ? 'show' : ''}`}>
      <div className={`days-counter-wrapper ${open ? 'open' : ''}`}>
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
                onCancel={handleCloseDialog}
              />
            )}

            <div className='days-counter-container'>
              {dates.length === 0 ? (
                <div className='days-counter-empty-state'>
                  <h3>Days Counter</h3>
                  <div className='days-counter-empty-title'>Tap to add a date</div>
                  <button onClick={addDate} className='days-counter-add-another-btn'>
                    ({dates.length}/{maxNumDates})
                  </button>
                </div>
              ) : (
                <>
                  {/* Carousel track */}
                  <div
                    className='days-counter-carousel'
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}>
                    <div
                      className='days-counter-carousel-track'
                      style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                      {dates.map((date, index) => (
                        <div key={date.id} className='days-counter-carousel-slide'>
                          <div className='days-counter-card'>
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
                                <div className='days-counter-stat days-counter-stat-days'>
                                  <span className='value'>{currentTimes[index]?.days?.toLocaleString() ?? 0}</span>
                                  <span className='label'>days</span>
                                </div>

                                <div className='days-counter-stat  days-counter-stat-hours'>
                                  <span className='value'>{currentTimes[index]?.hours?.toLocaleString() ?? 0}</span>
                                  <span className='label'>hours</span>
                                </div>
                                <div className='days-counter-stat  days-counter-stat-minutes'>
                                  <span className='value'>{currentTimes[index]?.minutes?.toLocaleString() ?? 0}</span>
                                  <span className='label'>minutes</span>
                                </div>
                              </div>
                            ) : (
                              <div className='days-counter-stat-group-new'>
                                <div className='days-counter-stat'>
                                  <span className='value'></span>
                                </div>
                              </div>
                            )}

                            <div className='days-counter-card-date'>
                              <div className='days-counter-card-title'>
                                <input
                                  id={`Days-Counter-Title-${index}`}
                                  type='text'
                                  placeholder='Tap to set a title'
                                  value={date.label}
                                  maxlength='10'
                                  onChange={(e) => updateDate(index, date.selectedDate, e.target.value, false)}
                                  className='days-counter-title-input'
                                />
                              </div>
                              <div className='days-counter-selected-date'>
                                {date.selectedDate && editingDateIndex !== index ? (
                                  <span
                                    className='days-counter-date-display'
                                    onClick={() => handleDateClick(index)}
                                    style={{ cursor: 'pointer' }}>
                                    {parse(formatDate(DOMPurify.sanitize(date.selectedDate)))}
                                  </span>
                                ) : null}
                                {(!date.selectedDate || editingDateIndex === index) && (
                                  <input
                                    type='datetime-local'
                                    value={date.selectedDate || ''}
                                    onChange={(e) => updateDate(index, e.target.value, date.label, false)}
                                    onBlur={() => setEditingDateIndex(-1)}
                                    min={getTenYearsAgo()}
                                    max={getToday()}
                                    className='days-counter-date-input'
                                    autoFocus={editingDateIndex === index}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Navigation Arrows (visible on desktop) */}
                    <button
                      className='days-counter-carousel-arrow left'
                      onClick={goToPrev}
                      disabled={currentIndex === 0}
                      aria-label='Previous date'>
                      <ChevronLeftIcon />
                    </button>
                    <button
                      className='days-counter-carousel-arrow right'
                      onClick={goToNext}
                      disabled={currentIndex === dates.length - 1}
                      aria-label='Next date'>
                      <ChevronRightIcon />
                    </button>
                  </div>

                  {/* Indicator Circles */}
                  <div className='days-counter-indicators'>
                    {dates.map((_, index) => (
                      <button
                        key={index}
                        className={`days-counter-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToIndex(index)}
                        aria-label={`Go to date ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Add another button (if under max) */}
                  {dates.length < maxNumDates && (
                    <div className='days-counter-button-container'>
                      <button onClick={addDate} className='days-counter-add-another-btn'>
                        ({dates.length}/{maxNumDates})
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className='days-counter-note-container'>
              <div className='days-counter-note'>
                <p>
                  * All dates are saved <u>only on your device</u> to ensure your privacy.
                </p>
                <p>Disable controls available in settings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DaysCounter
