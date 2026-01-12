import { useState, useEffect } from 'react';
// import { useShallow } from 'zustand/react/shallow';
import useAppStore from '@/store/useAppStore';
import BackdropParallax from '@/components/ui/backdrop/BackdropParallax';
import CloseBtn from '../../ui/buttons/close/CloseBtn';
import './styles.scss';

const calcUnits = (ml, abv) => (ml * abv) / 1000;

const DRINK_PRESETS = [
  {
    label: 'Beer & Cider',
    type: 'beer',
    drinks: [
      { label: 'Pint', volume: 568, unit: 'ml', abv: 5 },
      { label: 'Half pint ', volume: 284, unit: 'ml', abv: 4.5 },
      { label: 'Standard Can', volume: 440, unit: 'ml', abv: 5 },
      { label: 'Small Can', volume: 330, unit: 'ml', abv: 5 },
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
];

const UnitsCalculator = () => {
  const setActivity = useAppStore((state) => state.setActivity);
  const [type, setType] = useState(null);

  //   const { activity } = useAppStore(
  //     useShallow((state) => ({ activity: state.activity })),
  //   );

  const handleClose = () => {
    setOpen(false);
    setActivity(-1);
  };

  const [open, setOpen] = useState(false);
  const [drinks, setDrinks] = useState([]);

  const addDrink = (preset) => {
    console.log('addDrink', preset);
    setDrinks([...drinks, { ...preset, id: crypto.randomUUID() }]);
  };

  const updateDrink = (id, field, value) => {
    setDrinks(
      drinks.map((d) => (d.id === id ? { ...d, [field]: Number(value) } : d)),
    );
  };

  const removeDrink = (id) => {
    setDrinks(drinks.filter((d) => d.id !== id));
  };

  const totalUnits = drinks.reduce(
    (sum, d) => sum + calcUnits(d.volume, d.abv),
    0,
  );

  return (
    <div
      className={'ummi-units-calculator' + (open ? ' open' : '')}
      id='ummi-units-calculator'
    >
      <div className='inner'>
        <CloseBtn />
        <div className='content'>
          {' '}
          <h2>Units calculator</h2>
          <div className='calculator-core'>
            <div className='container-buttons'>
              <div className='measures-selector'>
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
                            <span className='title'>{preset.label}</span>
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
            <ul className='drinks-list'>
              {drinks.map((d) => (
                <li key={d.id} className='drinks-entry'>
                  {/* <input
                  type='number'
                  value={d.volume}
                  onChange={(e) => updateDrink(d.id, 'volume', e.target.value)}
                />{' '} */}
                  <div className='desc'>
                    <div className='row-1'>
                      <div className='multiplier'>1x</div>{' '}
                      <div className='label'>
                        {d.label} ({d.type} ){' '}
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
                    {calcUnits(d.volume, d.abv).toFixed(2)} units
                  </div>
                  <button onClick={() => removeDrink(d.id)}>✕</button>
                </li>
              ))}
            </ul>
          </div>
          <div className='drinks-total'>
            <div>
              <h3>Total : {totalUnits.toFixed(2)} units</h3>
            </div>
            <div className='calculation-details'>
              <div>How this is calculated:</div>
              <div>
                <span>Units</span> = <span>(volume in ml</span> X{' '}
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
