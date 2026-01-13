import { useState } from 'react';
// import { useShallow } from 'zustand/react/shallow';
import useAppStore from '@/store/useAppStore';
// import BackdropParallax from '@/components/ui/backdrop/BackdropParallax';
import CloseBtn from '../../ui/buttons/close/CloseBtn';
import './styles.scss';

const calcUnits = (ml, abv) => (ml * abv) / 1000;

const DRINK_PRESETS = [
  {
    label: 'Custom',
    type: 'custom',
    drinks: [],
  },
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
];

const UnitsCalculator = () => {
  const setActivity = useAppStore((state) => state.setActivity);
  const [type, setType] = useState(null);

  //   const { activity } = useAppStore(
  //     useShallow((state) => ({ activity: state.activity })),
  //   );

  // const handleClose = () => {
  //   setOpen(false);
  //   setActivity(-1);
  // };

  const [open, setOpen] = useState(false);
  const [drinks, setDrinks] = useState([]);

  const addDrink = (preset) => {
    const existingDrink = drinks.find(
      (d) =>
        d.label === preset.label &&
        d.volume === preset.volume &&
        d.abv === preset.abv,
    );

    if (existingDrink) {
      setDrinks(
        drinks.map((d) =>
          d.id === existingDrink.id ? { ...d, count: d.count + 1 } : d,
        ),
      );
    } else {
      setDrinks([...drinks, { ...preset, id: crypto.randomUUID(), count: 1 }]);
    }
  };

  // const updateDrink = (id, field, value) => {
  //   setDrinks(
  //     drinks.map((d) => (d.id === id ? { ...d, [field]: Number(value) } : d)),
  //   );
  // };

  const removeDrink = (id) => {
    const drinkToRemove = drinks.find((d) => d.id === id);
    if (drinkToRemove.count > 1) {
      setDrinks(
        drinks.map((d) => (d.id === id ? { ...d, count: d.count - 1 } : d)),
      );
    } else {
      setDrinks(drinks.filter((d) => d.id !== id));
    }
  };

  const totalUnits = drinks.reduce(
    (sum, d) => sum + calcUnits(d.volume, d.abv) * d.count,
    0,
  );

  return (
    <div
      className={'ummi-units-calculator' + (open ? ' open' : '')}
      id='ummi-units-calculator'
    >
      <div className='inner'>
        <CloseBtn className='close-btn' />
        <div className='content'>
          <div className='wrap'>
            {' '}
            <header>
              {' '}
              <h2>Units calculator</h2>
              <div className='intro'>
                Calculate the total units of alcohol in common measures.
              </div>
            </header>
            <section className='calculator-core'>
              <div className='selected-measures'>
                <div
                  style={{
                    textAlign: 'right',
                    fontSize: '0.7rem',
                    paddingRight: '1.6rem',
                    paddingBottom: '0.0rem',
                    textTransform: 'uppercase',
                    color: 'var(--greyLight)',
                    fontWeight: 600,
                  }}
                >
                  Less
                </div>
                <ul
                  className={'measures ' + (drinks.length === 0 ? ' none' : '')}
                >
                  {[...drinks]
                    .sort(
                      (a, b) =>
                        calcUnits(a.volume, a.abv) - calcUnits(b.volume, b.abv),
                    )
                    .map((d) => (
                      <li
                        key={d.id}
                        className='drinks-entry'
                        onClick={() => removeDrink(d.id)}
                      >
                        {/* <input
                  type='number'
                  value={d.volume}
                  onChange={(e) => updateDrink(d.id, 'volume', e.target.value)}
                />{' '} */}
                        <div className='desc'>
                          <div className='row-1'>
                            <div className='multiplier'>{d.count}x</div>{' '}
                            <div className='label'>
                              {d.label} ({d.type}){' '}
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
                        <button className='measure-action'>
                          {d.count > 1 ? '-' : '✕'}
                        </button>
                      </li>
                    ))}
                </ul>
                <div className='drinks-total'>
                  <div className='drinks-total-wrap'>
                    <h3>Total : {totalUnits.toFixed(2)} units</h3>
                    <div>({drinks.length} drinks)</div>
                  </div>
                </div>
              </div>
              <div className='container-buttons'>
                <div className='measures-selector'>
                  {type === null && (
                    <div className='measures-selector-label'>
                      Make a selection
                    </div>
                  )}

                  <div className='buttons'>
                    {DRINK_PRESETS.map((group) => (
                      <button
                        key={group.label}
                        onClick={() => setType(group.type)}
                        className={
                          'group' + (group.type === type ? ' selected' : ' ')
                        }
                      >
                        {group.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className='measures-container'>
                  {DRINK_PRESETS.map((group) =>
                    group.type === type ? (
                      <div key={group.label}>
                        <div className='measures-group'>
                          {/* <div className='measures-group-title'>{group.label}</div> */}
                          {group.drinks.map((preset) => (
                            <button
                              key={preset.label}
                              onClick={() =>
                                addDrink({ ...preset, type: group.type })
                              }
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
            </section>
            <div className='calculation-information'>
              <div>
                <span>Units calculated</span> = <span>(volume in ml</span> X{' '}
                <span>ABV%)</span> ÷ <span>1000</span>
              </div>
            </div>
          </div>
        </div>
        {/* <BackdropParallax
          initialImageId={2}
          initialDelay={3000}
          interval={6000}
          parallaxStrength={0}
        /> */}
      </div>
    </div>
  );
};

export default UnitsCalculator;
