import React from 'react';
import Checkbox from './checkbox';
import { usePasscodeStore } from '../store/usePasscodeStore';

const TestPasscodeCheckbox = () => {
  const store = usePasscodeStore();
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheck = async () => {
    if (!store.isPasscodeVerified) {
      // Show passcode dialog if not verified
      if (store.hasPasscode) {
        // Trigger passcode verification
        const verified = await store.verifyPasscode('');
        if (verified) {
          setIsChecked(true);
          // Save data to store
          store.setItem('testData', 'Sample data saved');
        }
      } else {
        // No passcode set, allow saving
        setIsChecked(true);
        store.setItem('testData', 'Sample data saved');
      }
    } else {
      setIsChecked(true);
      store.setItem('testData', 'Sample data saved');
    }
  };

  return (
    <div>
      <h2>Passcode Checkbox Test</h2>
      <Checkbox
        checked={isChecked}
        onChange={handleCheck}
      />
      <p>Current state: {isChecked ? 'Enabled' : 'Disabled'}</p>
      {isChecked && <p>Saved data: {store.getItem('testData')}</p>}
    </div>
  );
};

export default TestPasscodeCheckbox;
