import { useState, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useAppStore from '@/store/useAppStore'
import BackdropParallax from '@/components/ui/backdrop/BackdropParallax'
import CloseBtn from '../../ui/buttons/close/CloseBtn'
import parse from 'html-react-parser'
import './styles.scss'

const calcUnits = (ml, abv) => (ml * abv) / 1000

const DRINK_PRESETS = [
  {
    label: 'Beer & Cider',
    type: 'beer',
    drinks: [
      { label: 'Pint', volume: 568, unit: 'ml', abv: 5 },
      { label: 'Half pint ', volume: 284, unit: 'ml', abv: 4.5 },
      { label: 'Std Can', volume: 440, unit: 'ml', abv: 5 },
      { label: 'Sml Can', volume: 330, unit: 'ml', abv: 5 },
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
      { label: 'Sml Glass', volume: 125, unit: 'ml', abv: 13 },
      { label: 'Med Glass', volume: 175, unit: 'ml', abv: 13 },
      { label: 'Lrg Glass', volume: 250, unit: 'ml', abv: 13 },
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
  'No measures selected.<br /><br /> Add a drink with the <b>Measures</b> button<br /> or use <br /><b>Add Custom Drink</b>.'

const UnitsCalculator = () => {
  const setActivity = useAppStore((state) => state.setActivity)
  const [type, setType] = useState('custom')
  const [isMeasuresVisible, setIsMeasuresVisible] = useState(false)
  const [multiplier, setMultiplier] = useState(1)
  const [customDrink, setCustomDrink] = useState({
    label: 'Custom Drink',
    volume: 440,
    unit: 'ml',
    abv: 5,
    count: 1,
  })

  const [open, setOpen] = useState(false)
  const [drinks, setDrinks] = useState([])

  const { activity } = useAppStore(
    useShallow((state) => ({ activity: state.activity })),
  )

  useEffect(() => {
    setOpen(activity === 5)
  }, [activity])

  const handleClose = () => {
    console.log('handleClose')
    if (isMeasuresVisible) {
      setIsMeasuresVisible(false)
    } else {
      setOpen(false)
      setActivity(-1)
    }
  }

  const addDrink = (preset, countToAdd = 1) => {
    const existingDrink = drinks.find(
      (d) =>
        d.label === preset.label &&
        d.volume === preset.volume &&
        d.abv === preset.abv,
    )

    if (existingDrink) {
      setDrinks(
        drinks.map((d) =>
          d.id === existingDrink.id ? { ...d, count: d.count + countToAdd } : d,
        ),
      )
    } else {
      setDrinks([
        ...drinks,
        { ...preset, id: crypto.randomUUID(), count: countToAdd },
      ])
    }
  }

  const handleCustomDrinkChange = (e) => {
    const { name, value } = e.target
    setCustomDrink((prev) => ({ ...prev, [name]: value }))
  }

  const handleCustomDrinkSubmit = (e) => {
    e.preventDefault()
    addDrink(
      { ...customDrink, type: 'custom' },
      parseInt(customDrink.count, 10) || 1,
    )
  }

  // const updateDrink = (id, field, value) => {
  //   setDrinks(
  //     drinks.map((d) => (d.id === id ? { ...d, [field]: Number(value) } : d)),
  //   );
  // };

  const removeDrink = (id) => {
    const drinkToRemove = drinks.find((d) => d.id === id)
    if (drinkToRemove.count > 1) {
      setDrinks(
        drinks.map((d) => (d.id === id ? { ...d, count: d.count - 1 } : d)),
      )
    } else {
      setDrinks(drinks.filter((d) => d.id !== id))
    }
  }

  const totalUnits = drinks.reduce(
    (sum, d) => sum + calcUnits(d.volume, d.abv) * d.count,
    0,
  )

  const totalDrinkCount = drinks.reduce((sum, d) => sum + d.count, 0)

  return open ? (
    <section
      id='ummi-units-calculator'
      className={'activity ummi-units-calculator fixed' + (open ? ' open' : '')}
    >
      <div className='inner'>
        {!isMeasuresVisible && (
          <CloseBtn className='close-btn' handleClick={handleClose} />
        )}
        <div className='content'>
          <div className='wrap'>
            {' '}
            <header>
              {' '}
              <h2>Units Calculator</h2>
              {/* <div className='intro'>
                Calculate the total units of alcohol in common measures.
              </div> */}
            </header>
            <section className='calculator-core'>
              <div className='selected-measures'>
                <div className='instruction'>Tap row to remove</div>
                {drinks.length === 0 ? (
                  <div className='no-measures'>
                    {' '}
                    <div className='no-drinks-selected '>
                      {parse(noDrinksMessage)}
                    </div>
                  </div>
                ) : (
                  <ul
                    className={
                      'measures ' + (drinks.length === 0 ? ' none' : '')
                    }
                  >
                    {[...drinks]
                      .sort(
                        (a, b) =>
                          calcUnits(a.volume, a.abv) -
                          calcUnits(b.volume, b.abv),
                      )
                      .map((d) => (
                        <li
                          key={d.id}
                          className='drinks-entry'
                          onClick={() => removeDrink(d.id)}
                        >
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
                          <div className='units'>
                            {(calcUnits(d.volume, d.abv) * d.count).toFixed(2)}{' '}
                            units
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
                <div className='drinks-total'>
                  <div className='drinks-total-wrap'>
                    <h3>
                      Total : <span>{totalUnits.toFixed(2)} units </span>
                    </h3>{' '}
                    <div className='drinks-count'>
                      ({totalDrinkCount} drinks)
                    </div>
                  </div>
                </div>
              </div>
              <div className='container-buttons'>
                <div className='measures-selector'>
                  <div className='buttons'>
                    <button
                      onClick={() => {
                        setType('custom')
                        setIsMeasuresVisible(false)
                      }}
                      className={
                        'group' + (type === 'custom' ? ' selected' : ' ')
                      }
                    >
                      Custom
                    </button>
                    <button
                      onClick={() => setIsMeasuresVisible(true)}
                      className='group'
                    >
                      Measures
                    </button>
                  </div>
                </div>

                <div className='measures-container'>
                  {type === 'custom' && (
                    <form
                      onSubmit={handleCustomDrinkSubmit}
                      className='custom-drink-form'
                    >
                      <div className='row'>
                        {/* <div>Name</div> */}
                        <label htmlFor='custom-drink-name'>
                          <input
                            id='custom-drink-name'
                            type='text'
                            name='label'
                            value={customDrink.label}
                            onChange={handleCustomDrinkChange}
                            placeholder='Drink Name'
                          />
                        </label>
                      </div>
                      <div className='row'>
                        <label htmlFor='custom-drink-count'>
                          <input
                            id='custom-drink-count'
                            type='number'
                            name='count'
                            value={customDrink.count}
                            onChange={handleCustomDrinkChange}
                            placeholder='Count'
                          />
                          <div>x</div>
                        </label>
                        <label htmlFor='custom-drink-volume'>
                          <input
                            id='custom-drink-volume'
                            type='number'
                            name='volume'
                            value={customDrink.volume}
                            onChange={handleCustomDrinkChange}
                            placeholder='Volume (ml)'
                          />
                          <div>(ml)</div>
                        </label>
                        <label htmlFor='custom-drink-abv'>
                          <input
                            id='custom-drink-abv'
                            type='number'
                            name='abv'
                            value={customDrink.abv}
                            onChange={handleCustomDrinkChange}
                            placeholder='ABV (%)'
                          />
                          <div>ABV (%)</div>
                        </label>
                      </div>
                      <button type='submit' className='measure custom'>
                        Add Custom Drink
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
            {isMeasuresVisible && (
              <div
                className='measures-scroll-list'
                onClick={() => setIsMeasuresVisible(false)}
              >
                <CloseBtn
                  className='close-btn-measures'
                  handleClick={() => setIsMeasuresVisible(false)}
                />
                <div
                  className='measures-scroll-list-inner'
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className='multiplier-input'>
                    <label htmlFor='multiplier'>No of:</label>
                    <input
                      type='number'
                      id='multiplier'
                      name='multiplier'
                      value={multiplier}
                      onChange={(e) =>
                        setMultiplier(parseInt(e.target.value, 10) || 1)
                      }
                      min={1}
                    />
                  </div>
                  {DRINK_PRESETS.map((group) =>
                    group.type !== 'custom' ? (
                      <div key={group.label} className='measures-group'>
                        {/* <div className='measures-group-title'>
                              {group.label}
                            </div> */}
                        <div className='measures-group-buttons'>
                          {group.drinks.map((preset) => (
                            <button
                              key={preset.label}
                              onClick={() => {
                                addDrink(
                                  { ...preset, type: group.type },
                                  multiplier,
                                )
                                setIsMeasuresVisible(false)
                              }}
                              className='measure'
                            >
                              <span className='measure-title'>
                                {preset.label}
                              </span>
                              <span className='spec'>
                                <span className='volume'>
                                  {preset.volume} {preset.unit}
                                </span>
                                <span className='abv'>{preset.abv} %</span>
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
            <div className='calculation-information'>
              <div>
                <span>Units calculated</span> = <span>(volume in ml</span> X{' '}
                <span>ABV%)</span> ÷ <span>1000</span>
              </div>
            </div>
          </div>
        </div>
        <BackdropParallax
          className='backdrop'
          initialImageId={2}
          initialDelay={3000}
          interval={6000}
          parallaxStrength={0}
        />
      </div>
    </section>
  ) : (
    <></>
  )
}

export default UnitsCalculator
