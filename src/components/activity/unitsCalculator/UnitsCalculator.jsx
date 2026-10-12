import { useState, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useAppStore from '@store/useAppStore'
import CloseBtn from '../../ui/buttons/close/CloseBtn'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import { activities } from '@data/config'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})
import './unitsCalculator.scss'

const calcUnits = (ml, abv) => (ml * abv) / 1000

const DRINK_PRESETS = [
  {
    label: 'Beer & Cider',
    type: 'beer',
    drinks: [
      { label: 'Pint', volume: 568, unit: 'ml', abv: 5 },
      { label: 'Half pint ', volume: 284, unit: 'ml', abv: 4.5 },
      { label: 'Larger Can', volume: 440, unit: 'ml', abv: 5 },
      { label: 'Larger Can Sml', volume: 330, unit: 'ml', abv: 5 },
      { label: 'Strong Larger', volume: 440, unit: 'ml', abv: 7.5 },
      { label: 'Strong Cider', volume: 440, unit: 'ml', abv: 7.5 },
    ],
  },
  // { label: 'Bottle', volume: 330, unit: 'ml', abv: 5 },
  // { label: 'Bottle', volume: 330, unit: 'ml', abv: 5 },
  {
    label: 'Wine',
    type: 'wine',
    drinks: [
      { label: 'Small Glass', volume: 125, unit: 'ml', abv: 13 },
      { label: 'Medium Glass', volume: 175, unit: 'ml', abv: 13 },
      { label: 'Large Glass', volume: 250, unit: 'ml', abv: 13 },
      { label: 'Bottle', volume: 750, unit: 'ml', abv: 13 },
    ],
  },

  {
    label: 'Spirits',
    type: 'spirits',
    drinks: [
      { label: 'Single', volume: 25, unit: 'ml', abv: 40 },
      { label: 'Double', volume: 50, unit: 'ml', abv: 40 },
      { label: 'Bottle', volume: 70, unit: 'cl', abv: 40 },
      { label: 'Half Bottle', volume: 35, unit: 'cl', abv: 40 },
    ],
  },
  {
    label: 'Custom',
    type: 'custom',
    drinks: [],
  },
]

const noDrinksMessage =
  ' <h5 class="yellow"><b>No measures selected. </b> </h5><br /><br /> Add a <br /><b>Measure</b> <br /> or <br /><b>Custom Drink</b>.'

const UnitsCalculator = () => {
  const name = 'unitsCalculator'
  const id = 5
  const setActivity = useAppStore((s) => s.setActivity)
  const isModal = useAppStore((s) => s.isModal)
  const [type, setType] = useState('custom')
  const [isMeasuresVisible, setIsMeasuresVisible] = useState(false)
  const [multiplier, setMultiplier] = useState(1)
  const [customDrink, setCustomDrink] = useState({
    label: '',
    volume: 440,
    unit: 'ml',
    abv: 5,
    count: 1,
  })

  const [open, setOpen] = useState(false)
  const [drinks, setDrinks] = useState([])

  const { activity } = useAppStore(useShallow((s) => ({ activity: s.activity })))
  const setIsModal = useAppStore((s) => s.setIsModal)
  useEffect(() => {
    open && setIsModal(activitiesById[id]?.modal)
  }, [open, activitiesById, id, setIsModal])

  useEffect(() => {
    setOpen(activity === id)
  }, [activity, id])

  const handleClose = () => {

    if (isMeasuresVisible) {
      setIsMeasuresVisible(false)
    } else {
      setOpen(false)
      setActivity(-1)
    }
  }

  const addDrink = (preset, countToAdd = 1) => {
    const existingDrink = drinks.find(
      (d) => d.label === preset.label && d.volume === preset.volume && d.abv === preset.abv,
    )

    if (existingDrink) {
      setDrinks(drinks.map((d) => (d.id === existingDrink.id ? { ...d, count: d.count + countToAdd } : d)))
    } else {
      setDrinks([...drinks, { ...preset, id: crypto.randomUUID(), count: countToAdd }])
    }
  }

  const handleCustomDrinkChange = (e) => {
    const { name, value } = e.target
    setCustomDrink((prev) => ({ ...prev, [name]: value }))
  }

  const handleCustomDrinkSubmit = (e) => {
    e.preventDefault()
    addDrink({ ...customDrink, type: 'custom' }, parseInt(customDrink.count, 10) || 1)
  }

  // const updateDrink = (id, field, value) => {
  //   setDrinks(
  //     drinks.map((d) => (d.id === id ? { ...d, [field]: Number(value) } : d)),
  //   );
  // };

  const removeDrink = (id) => {
    const drinkToRemove = drinks.find((d) => d.id === id)
    if (drinkToRemove.count > 1) {
      setDrinks(drinks.map((d) => (d.id === id ? { ...d, count: d.count - 1 } : d)))
    } else {
      setDrinks(drinks.filter((d) => d.id !== id))
    }
  }

  const totalUnits = drinks.reduce((sum, d) => sum + calcUnits(d.volume, d.abv) * d.count, 0)

  const totalDrinkCount = drinks.reduce((sum, d) => sum + d.count, 0)

  return open ? (
    <section id='ummi-units-calculator' className={'activity ummi-units-calculator fixed' + (open ? ' open' : '')}>
      {!isMeasuresVisible && <CloseBtn className='close-btn-activity' onClick={handleClose} />}
      <div className='inner'>
        <div className='wrap'>
          <header>
            <h3>Units Calculator</h3>
          </header>

          <div className='ummi-uc__row ummi-uc__selected-measures'>
            {drinks.length > 0 ? <div className='ummi-uc__selected-measures-instruction'>Tap row to remove</div> : null}
            {drinks.length === 0 ? (
              <div className='ummi-uc__no-measures'>
                {' '}
                <div className='ummi-uc__no-selection'>{parse(DOMPurify.sanitize(noDrinksMessage))}</div>
              </div>
            ) : (
              <ul className={'ummi-uc__measures ' + (drinks.length === 0 ? ' none' : '')}>
                {[...drinks]
                  .sort((a, b) => calcUnits(a.volume, a.abv) - calcUnits(b.volume, b.abv))
                  .map((d) => (
                    <li key={d.id} className='drinks-entry' onClick={() => removeDrink(d.id)}>
                      <div className='desc'>
                        <div className='row-1'>
                          <div className='multiplier'>{d.count}x</div>{' '}
                          <div className='label'>
                            {d.label} <span>({d.type})</span>{' '}
                          </div>
                        </div>{' '}
                        <div className='row-2'>
                          <div className='vol'>
                            {d.volume} {d.unit}
                          </div>{' '}
                          <div className='pct-abv'>{d.abv} % ABV</div>
                        </div>
                      </div>
                      <div className='equals'>=</div>
                      <div className='units'>{(calcUnits(d.volume, d.abv) * d.count).toFixed(2)} units</div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div className='ummi-uc__row ummi-uc__drinks-total'>
            <button onClick={() => setIsMeasuresVisible(true)} className='ummi-uc__button-measures'>
              Standard Measures
            </button>
            <div className='ummi-uc__drinks-total-wrap'>
              <div className='ummi-uc__drinks-count'>
                <div>Total : </div>
                <div>({totalDrinkCount} drinks)</div>
              </div>
              <div>
                <span>{totalUnits.toFixed(2)} units </span>
              </div>
            </div>
          </div>
          <div className='ummi-uc__row'>
            <div className='ummi-uc__measures'>
              {type === 'custom' && (
                <form onSubmit={handleCustomDrinkSubmit} className='ummi-uc__custom-drink-form'>
                  <div className='row name'>
                    <input
                      id='custom-drink-name'
                      className='ummi-uc__custom-drink-name'
                      type='text'
                      name='label'
                      value={customDrink.label}
                      onChange={handleCustomDrinkChange}
                      placeholder='Custom Drink Name'
                    />
                  </div>
                  <div className='row'>
                    <div className='item multiplier'>
                      <input
                        id='custom-drink-count'
                        className='ummi-uc__custom-drink-count'
                        type='text'
                        inputmode='numeric'
                        name='count'
                        value={customDrink.count}
                        onChange={handleCustomDrinkChange}
                        placeholder='Count'
                      />
                      <label htmlFor='custom-drink-count'>X</label>
                    </div>
                    <div className='item'>
                      <input
                        id='custom-drink-volume'
                        className='ummi-uc__custom-drink-volume'
                        type='text'
                        inputmode='numeric'
                        name='volume'
                        value={customDrink.volume}
                        onChange={handleCustomDrinkChange}
                        placeholder='Volume (ml)'
                      />
                      <label htmlFor='custom-drink-volume'>ml</label>
                    </div>
                    <div className='item'>
                      <input
                        id='custom-drink-abv'
                        className='ummi-uc__custom-drink-abv'
                        type='text'
                        inputmode='numeric'
                        name='abv'
                        value={customDrink.abv}
                        onChange={handleCustomDrinkChange}
                        placeholder='%'
                      />
                      <label htmlFor='custom-drink-abv'>%</label>
                    </div>
                  </div>
                  <button type='submit' className='ummi-uc__button-measure custom'>
                    Add Custom Drink
                  </button>
                </form>
              )}
            </div>
          </div>

          {isMeasuresVisible && (
            <div className='ummi-uc__row ummi-uc__measures-list' onClick={() => setIsMeasuresVisible(false)}>
              <CloseBtn className='close-btn-measures' handleClick={() => setIsMeasuresVisible(false)} />
              <div className='ummi-uc__measures-list-inner' onClick={(e) => e.stopPropagation()}>
                <div className='ummi-uc__measure-multiplier'>
                  <label htmlFor='multiplier'>No of:</label>
                  <input
                    className=''
                    type='number'
                    id='multiplier'
                    name='multiplier'
                    value={multiplier}
                    onChange={(e) => setMultiplier(parseInt(e.target.value, 10) || 1)}
                    min={1}
                  />
                </div>
                {DRINK_PRESETS.map((group) =>
                  group.type !== 'custom' ? (
                    <div key={group.label} className='ummi-uc__measures-group'>
                      {/* <div className='measures-group-title'>
                              {group.label}
                            </div> */}
                      <div className='ummi-uc__measures-group-buttons'>
                        {group.drinks.map((preset) => (
                          <button
                            key={preset.label}
                            onClick={() => {
                              addDrink({ ...preset, type: group.type }, multiplier)
                              setIsMeasuresVisible(false)
                            }}
                            className={'ummi-uc__measure-button ' + group.type}>
                            <span className='ummi-uc__measure-title'>{preset.label}</span>
                            <span className='ummi-uc__measure-spec'>
                              <span className='abv'>
                                {preset.abv} <span className='unit'>%</span>
                              </span>
                              <span className='volume'>
                                {preset.volume} <span className='unit'>{preset.unit}</span>
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          )}
          <div className='ummi-uc__row ummi-uc__calculation-information'>
            <div>
              <span>Units calculated</span> = <span>(volume in ml</span> X <span>ABV%)</span> ÷ <span>1000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <></>
  )
}

export default UnitsCalculator
