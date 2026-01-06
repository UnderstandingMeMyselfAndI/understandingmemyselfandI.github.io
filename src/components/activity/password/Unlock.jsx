import { useState, useEffect } from 'react';
import { useDrinkLogStore } from '@/store/drinkLogStore';
import { verifyPin, setPasswordKey } from '@/src/js/utils/secureStorage';
import PropTypes from 'prop-types';

const MAX_RETRIES = 3; // Define max retries as a constant

const Unlock = ({ onSuccess, unlockStoreProp }) => {
  const [pin, setPinInput] = useState('');
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const unlockStore = useDrinkLogStore(unlockStoreProp);

  useEffect(() => {
    // Cleanup function to be called on component unmount
    return () => {
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess = null; // Prevent memory leaks
      }
    };
  }, []);

  const handlePin = async (e) => {
    e.preventDefault();
    if (await verifyPin(pin)) {
      unlockStore.unlock(); // ✅ set global unlocked state
      onSuccess();
    } else {
      setError('Invalid PIN');
      setRetryCount(retryCount + 1);
      if (retryCount >= MAX_RETRIES - 1) {
        setError('Too many attempts. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handlePin}>
      <label>
        Enter PIN
        <input
          type='number' // Change input type to 'number'
          value={pin}
          onChange={(e) => setPinInput(e.target.value)}
          // maxLength='4' // Optional: Limit the length of the PIN
        />
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type='submit'>Unlock</button>
    </form>
  );
};

Unlock.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  unlockStoreProp: PropTypes.object, // Optional prop for dependency injection
};
export default Unlock;
