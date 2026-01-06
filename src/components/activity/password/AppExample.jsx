import { useState, useEffect } from 'react';
import OptionalPasswordSetup from './OptionalPasswordSetup';
import WeeklyChart from './WeeklyChart';

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [firstLoad, setFirstLoad] = useState(null);

  useEffect(() => {
    // Quick check if drink log already exists
    const hasData = localStorage.getItem('drink-log-store');
    setFirstLoad(hasData === null);
  }, []);

  if (firstLoad === null) return <p>Loading...</p>;

  if (!unlocked) {
    return <OptionalPasswordSetup onSuccess={() => setUnlocked(true)} />;
  }

  return (
    <div>
      <WeeklyChart />
      {/* other components */}
    </div>
  );
}
