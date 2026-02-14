import { usePlannerStore } from '@/store/usePlannerStore'
import { calcUnits } from '.@/src//js/utils/alcoholUtils'

export default function FuturePlanner() {
  const { plans, addPlan, removePlan } = usePlannerStore()

  const addSamplePlan = () => {
    addPlan({
      id: crypto.randomUUID(),
      date: '2026-01-10',
      volume: 568,
      abv: 5,
      label: 'Saturday pint',
    })
  }

  return (
    <div id='planner' className='activity'>
      <h2>Future planner</h2>

      <button onClick={addSamplePlan}>Add planned drink</button>

      <ul>
        {plans.map((p) => (
          <li key={p.id}>
            <strong>{p.date}</strong> — {p.label || 'Planned drink'} (
            {calcUnits(p.volume, p.abv).toFixed(1)} units)
            <button onClick={() => removePlan(p.id)}>✕</button>
          </li>
        ))}
      </ul>

      <p>
        Planned drinks don’t affect totals. This is for thinking ahead only.
      </p>
    </div>
  )
}
