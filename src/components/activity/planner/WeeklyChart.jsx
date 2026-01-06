import { useState } from 'react';
import { useDrinkLogStore } from '@/store/drinkLogStore';
import { calcUnits, getWeekDates } from '../utils/alcoholUtils';
import '../styles/weekly-chart.scss';
import '../styles/a11y.scss';
export default function WeeklyChart() {
  const drinks = useDrinkLogStore((state) => state.drinks);
  const isUnlocked = useDrinkLogStore((state) => state.isUnlocked);
  const [showReference, setShowReference] = useState(true);
  const week = getWeekDates();

  if (!isUnlocked) {
    return <p>Please unlock to view your data</p>;
  }

  const dailyTotals = week.map((date) =>
    drinks
      .filter((d) => d.date === date)
      .reduce((sum, d) => sum + calcUnits(d.volume, d.abv), 0),
  );

  const weeklyTotal = dailyTotals.reduce((a, b) => a + b, 0);
  const maxUnits = Math.max(14, ...dailyTotals);

  return (
    <section
      className='weekly-chart'
      aria-labelledby='weekly-chart-title'
      aria-describedby='weekly-chart-desc'
    >
      <header className='weekly-chart__header'>
        <h2 id='weekly-chart-title'>Weekly alcohol units</h2>

        <label className='weekly-chart__toggle'>
          <input
            type='checkbox'
            checked={showReference}
            onChange={() => setShowReference((v) => !v)}
          />
          <span>Show 14-unit reference</span>
        </label>
      </header>

      <p id='weekly-chart-desc' className='weekly-chart__summary'>
        Estimated units per day. Weekly total:{' '}
        <strong>{weeklyTotal.toFixed(1)}</strong> units.
      </p>

      <svg
        className='weekly-chart__svg'
        role='img'
        tabIndex='0'
        aria-labelledby='chart-title chart-desc'
        width='280'
        height='190'
      >
        <title id='chart-title'>Alcohol units per day, this week</title>
        <desc id='chart-desc'>
          Bar chart showing estimated alcohol units for each day of the current
          week.
        </desc>

        {showReference && (
          <g className='weekly-chart__reference'>
            <line
              x1='0'
              x2='280'
              y1={140 - (14 / maxUnits) * 140}
              y2={140 - (14 / maxUnits) * 140}
            />
            <text x='4' y={136 - (14 / maxUnits) * 140}>
              14-unit reference
            </text>
          </g>
        )}

        {dailyTotals.map((units, i) => {
          const height = (units / maxUnits) * 140;

          return (
            <g
              key={i}
              className='weekly-chart__bar'
              transform={`translate(${i * 38 + 14},0)`}
            >
              <rect
                x='0'
                y={140 - height}
                width='30'
                height={height}
                rx='4'
                tabIndex='0'
                aria-label={`${
                  [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ][i]
                }: ${units.toFixed(1)} units`}
              />
              <text x='15' y='165' textAnchor='middle'>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </text>
            </g>
          );
        })}
      </svg>

      <table className='sr-only'>
        <caption>Weekly alcohol units</caption>
        <thead>
          <tr>
            <th>Day</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          {dailyTotals.map((u, i) => (
            <tr key={i}>
              <td>
                {
                  [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ][i]
                }
              </td>
              <td>{u.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className='weekly-chart__note'>
        The 14-unit figure is a reference point, not a target.
      </p>
    </section>
  );
}
