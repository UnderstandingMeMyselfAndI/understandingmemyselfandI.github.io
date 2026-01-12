import { useDrinkLogStore } from '@/store/drinkLogStore';

export default function WeeklyChart() {
  const drinks = useDrinkLogStore((state) => state.drinks);
  const isUnlocked = useDrinkLogStore((state) => state.isUnlocked);

  if (!isUnlocked) {
    return <p>Please unlock to view your data</p>;
  }

  return (
    <div>
      <h2>Weekly Drinks Chart</h2>
      {/* render chart using drinks */}
    </div>
  );
}
