import { useState } from 'react';
import { useDrinkLogStore } from '@/store/drinkLogStore';
import { verifyPin, setPasswordKey } from '@src/js/utils/secureStorage';

import PropTypes from 'prop-types';
const Unlock = ({ onSuccess }) => {
  const [pin, setPinInput] = useState('');
  const [error, setError] = useState('');
  const unlockStore = useDrinkLogStore();

  const handlePin = async (e) => {
    e.preventDefault();
    if (await verifyPin(pin)) {
      // AES key is already in memory from first setup
      unlockStore.unlock(); // ✅ set global unlocked state
      onSuccess();
    } else {
      setError('Invalid PIN');
    }
  };

  return (
    <form onSubmit={handlePin}>
      <label>
        Enter PIN
        <input
          type='text'
          value={pin}
          onChange={(e) => setPinInput(e.target.value)}
        />
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type='submit'>Unlock</button>
    </form>
  );
};

Unlock.propTypes = { onSuccess: PropTypes.func.isRequired };
export default Unlock;
