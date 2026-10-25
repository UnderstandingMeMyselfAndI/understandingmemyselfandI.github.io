// DaysCounter.jsx (updated version)
import { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import CloseBtn from '@ui/buttons/close/CloseBtn'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import IconArrowChevronLeft from '@icons/IconArrowChevronLeft'
import IconArrowChevronRight from '@icons/IconArrowChevronRight'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import useAppStore from '@store/useAppStore'
import Dialog from '@ui/dialog/Dialog'
import { strings } from '@data/config.js'
import { weekPercentageProgress, monthPercentageProgress, yearPercentageProgress } from '@js/utils.js'
import './daysCounter.scss'
const MAXIMUM_COUNTERS = 10

// Common currency list for the dropdown
const COMMON_CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD <span>$</span>' },
  { code: 'EUR', symbol: '€', label: 'EUR €' },
  { code: 'GBP', symbol: '£', label: 'GBP £' },
  { code: 'JPY', symbol: '¥', label: 'JPY ¥' },
  { code: 'CAD', symbol: 'C$', label: 'CAD C$' },
  { code: 'AUD', symbol: 'A$', label: 'AUD A$' },
  { code: 'CHF', symbol: 'Fr', label: 'CHF Fr' },
  { code: 'CNY', symbol: '¥', label: 'CNY ¥' },
  { code: 'INR', symbol: '₹', label: 'INR ₹' },
  { code: 'MXN', symbol: '$', label: 'MXN $' },
  { code: 'BRL', symbol: 'R$', label: 'BRL R$' },
]
const setTimes = (dates) => {
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
  return newTimes
}
const getInitialDates = () => {
  try {
    const saved = localStorage.getItem('daysCounterDates')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}
const DaysCounter = () => {
  const name = 'days-counter'
  const component_strings = strings.activity.find((string) => string.slug == name)
  const setActivity = useAppStore((state) => state.setActivity)

  // Currency from store
  const currency = useAppStore((s) => s.currency)
  const setCurrency = useAppStore((s) => s.setCurrency)

  const [showDialog, setShowDialog] = useState(false)
  const [dialogIndex, setDialogIndex] = useState(-1)
  const [editingDateIndex, setEditingDateIndex] = useState(-1)
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxNumDates = MAXIMUM_COUNTERS

  const [dates, setDates] = useState(getInitialDates())

  // Touch handling for swipe (unchanged)

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      goToNext()
    },
    onSwipedRight: () => {
      goToPrev()
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: false,
  })
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
    setActivity(-1)
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
  }

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
    } catch {
      // console.error('Failed to save to localStorage', e)
    }
  }, [dates])

  // Auto-detect currency only once on mount if no currency is set in store
  useEffect(() => {
    if (currency === 'USD' && navigator.language) {
      try {
        const detected = new Intl.NumberFormat(navigator.language).resolvedOptions().currency
        if (detected && detected !== 'USD') {
          setCurrency(detected)
        }
      } catch {
        // fallback to USD (do nothing)
      }
    }
  }, [currency, setCurrency])

  const addCounter = () => {
    if (dates.length < maxNumDates) {
      setDates([
        ...dates,
        {
          id: Date.now(),
          selectedDate: null,
          label: '',
          dailyCost: 0,
        },
      ])
      // setCurrentIndex(Math.min(dates.length, Math.max(dates.length - 1, 0)))
      setTimeout(() => {
        goToIndex(dates.length)
      }, 200)
    }
  }

  const updateDate = (index, dateValue, labelValue, isDateChange = false, dailyCostValue = null) => {
    const newDates = [...dates]
    newDates[index] = {
      ...newDates[index],
      selectedDate: dateValue,
      label: labelValue,
      ...(dailyCostValue !== null && { dailyCost: dailyCostValue }),
    }
    setDates(newDates)
    if (isDateChange) setEditingDateIndex(-1)
  }

  const deleteDate = (index) => {
    // const dateId = dates[index].id
    setDates(dates.filter((_, i) => i !== index))
    goToIndex(dates.length - 2)

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

  // Format money with selected currency
  const formatMoney = (amount, decimalPlaces = 2) => {
    if (typeof amount !== 'number' || isNaN(amount)) return ''
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(amount)
  }

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value)
  }

  // const getCurrencySymbol = (code) => {
  //   return COMMON_CURRENCIES.find((curr) => curr.code === code)?.symbol ?? ''
  // }

  return (
    <section className={`activity activity-${name} `}>
      <div className={`days-counter`}>
        <div className='days-counter__wrap'>
          <div className='days-counter__inner'>
            <CloseBtn classes='days-counter__close-btn' onClick={handleClose} />

            {dates.length > 0 && (
              <header className='days-counter__header'>
                <h3>{component_strings.title}</h3>
              </header>
            )}

            {showDialog && (
              <Dialog
                show={showDialog}
                title={component_strings.counter.delete.confirm_delete.title} //'Delete Date'
                instruction={component_strings.counter.delete.confirm_delete.msg} //'Are you sure you want to delete this date?'
                onConfirm={() => deleteDate(dialogIndex)}
                onCancel={handleCloseDialog}
              />
            )}

            <div className='days-counter__container'>
              {dates.length === 0 ? (
                <div className='days-counter__empty-state'>
                  <h3>{component_strings.title}</h3>
                  <div className='days-counter__empty-wrap'>
                    <div className='days-counter__empty-title'>{component_strings.counter.add}</div>
                    <button onClick={addCounter} className='days-counter__add-another-btn'>
                      ({dates.length}/{maxNumDates})
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Carousel track */}
                  <div className='days-counter__carousel' {...handlers}>
                    <div
                      className='days-counter__carousel-track'
                      style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                      {dates.map((date, index) => (
                        <div key={date.id} className='days-counter__carousel-slide'>
                          <div className='days-counter__card'>
                            <button
                              onClick={() => {
                                setDialogIndex(index)
                                setShowDialog(true)
                              }}
                              className='days-counter__delete-btn'
                              title='Delete'>
                              <DeleteForeverIcon />
                            </button>

                            {/* {date.selectedDate ? ( */}
                            <div className='days-counter__values'>
                              <div className='days-counter__stat days-counter__stat-days'>
                                <span className='value'>{setTimes(dates)[index]?.days?.toLocaleString() ?? 1}</span>
                                <span className='label days'>days</span>
                              </div>
                              <div className='days-counter__stat days-counter__stat-hours-mins'>
                                <div className='days-counter__stat-time'>
                                  <span className='value'>{setTimes(dates)[index]?.hours?.toLocaleString() ?? 0}</span>
                                  <span className='label'>hrs</span>
                                </div>
                                <div className='days-counter__stat-time '>
                                  <span className='value'>
                                    {setTimes(dates)[index]?.minutes?.toLocaleString() ?? 0}
                                  </span>
                                  <span className='label'>mins</span>
                                </div>
                              </div>
                            </div>

                            <div className='days-counter__card-date'>
                              <div className='days-counter__card-title'>
                                <input
                                  id={`Days-Counter-Title-${index}`}
                                  type='text'
                                  placeholder={component_strings.counter.placeholders.name}
                                  value={date.label}

                                  maxLength='10'
                                  onChange={(e) => updateDate(index, date.selectedDate, e.target.value, false)}
                                  className='days-counter__title-input'
                                />
                              </div>
                              <div className='days-counter__selected-date'>
                                {date.selectedDate && editingDateIndex !== index ? (
                                  <span
                                    className='days-counter__date-display'
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
                                    className='days-counter__date-input'
                                    autoFocus={editingDateIndex === index}
                                  />
                                )}
                              </div>
                            </div>
                            {/* Financial Savings */}
                            {/* <div className='days-counter__savings-container'> */}
                            <div className='days-counter__cost-container'>
                              <div className='days-counter__cost'>
                                <label htmlFor={`daily-cost-${index}`}>
                                  <div>{component_strings.counter.labels.daily_amount}</div>
                                </label>
                                <select
                                  className='days-counter__currency-selector'
                                  value={currency}
                                  onChange={handleCurrencyChange}
                                  aria-label='Select currency'>
                                  {COMMON_CURRENCIES.map((curr) => (
                                    <option key={curr.code} value={curr.code}>
                                      {parse(curr.label)}
                                    </option>
                                  ))}
                                </select>
                                <input
                                  id={`daily-cost-${index}`}
                                  type='text'
                                  inputMode='numeric'
                                  min='0'
                                  step='0.01'
                                  value={date.dailyCost ?? 0}
                                  onChange={(e) =>
                                    updateDate(
                                      index,
                                      date.selectedDate,
                                      date.label,
                                      false,
                                      parseFloat(e.target.value) || 0,
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className='days-counter__savings-rates all'>
                              <div className='days-counter__savings-rate-all-time'>
                                <span className='days-counter__total-value'>
                                  {date.dailyCost
                                    ? formatMoney(date.dailyCost * setTimes(dates)[index]?.days, 0)
                                    : '$00.00'}
                                </span>
                                <span className='days-counter__total-label'>
                                  {' '}
                                  {component_strings.counter.labels.total_saved}
                                </span>
                              </div>
                            </div>
                            <div className='days-counter__savings-rates'>
                              <div className='days-counter__savings-rate'>
                                <span className='days-counter__savings-rate-label'>
                                  {component_strings.counter.labels.week}
                                </span>
                                <span className='days-counter__savings-rate-value'>
                                  {formatMoney(date.dailyCost * 7)}
                                </span>
                                <div
                                  className='days-counter__savings-rate-bg'
                                  style={{ width: `${weekPercentageProgress()}%` }}></div>
                              </div>
                              <div className='days-counter__savings-rate'>
                                <span className='days-counter__savings-rate-label'>
                                  {' '}
                                  {component_strings.counter.labels.month}
                                </span>
                                <span className='days-counter__savings-rate-value'>
                                  {formatMoney(date.dailyCost * 30.44)}
                                </span>
                                <div
                                  className='days-counter__savings-rate-bg'
                                  style={{ width: `${monthPercentageProgress()}%` }}></div>
                              </div>

                              <div className='days-counter__savings-rate'>
                                <span className='days-counter__savings-ate-label'>
                                  {' '}
                                  {component_strings.counter.labels.year}
                                </span>
                                <span className='days-counter__savings-rate-value'>
                                  {formatMoney(date.dailyCost * 365.25)}
                                </span>
                                <div
                                  className='days-counter__savings-rate-bg'
                                  style={{ width: `${yearPercentageProgress()}%` }}></div>
                              </div>
                            </div>
                            {/* </div> */}
                            {/* )} */}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      className='days-counter__carousel-arrow left'
                      onClick={goToPrev}
                      disabled={currentIndex === 0}
                      aria-label='Previous date'>
                      <IconArrowChevronLeft />
                    </button>
                    <button
                      className='days-counter__carousel-arrow right'
                      onClick={goToNext}
                      disabled={currentIndex === dates.length - 1}
                      aria-label='Next date'>
                      <IconArrowChevronRight />
                    </button>
                  </div>

                  {/* Indicator Circle */}
                  <div className='days-counter__indicators'>
                    {dates.map((_, index) => (
                      <button
                        key={index}
                        className={`days-counter__indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToIndex(index)}
                        aria-label={`Go to counter ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Add another button */}
                  {dates.length < maxNumDates && (
                    <div className='days-counter__button-container'>
                      <button onClick={addCounter} className='days-counter__add-another-btn'>
                        ({dates.length}/{maxNumDates})
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DaysCounter
