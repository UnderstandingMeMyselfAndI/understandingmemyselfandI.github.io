import React from 'react';
import { usePasscodeStore } from '../store/usePasscodeStore';

const PasscodeCheckbox = ({ 
  checked, 
  onChange, 
  children = 'Enable Passcode',
  dataKey = 'checkboxData',
  ...props 
}) => {
  const store = usePasscodeStore();
  const [isPasscodeVerified, setIsPasscodeVerified] = React.useState(false);

  React.useEffect(() => {
    if (store.isPasscodeVerified && Date.now() < store.passcodeVerifiedUntil) {
      setIsPasscodeVerified(true);
    }
  }, [store.isPasscodeVerified, store.passcodeVerifiedUntil]);

  const handleCheck = async (e) => {
    if (!isPasscodeVerified) {
      // Show passcode dialog if not verified
      if (store.hasPasscode) {
        // Trigger passcode verification
        const verified = await store.verifyPasscode(''); // You'd need to implement actual verification
        if (verified) {
          setIsPasscodeVerified(true);
          onChange?.(e);
        }
      } else {
        // No passcode set, allow saving
        onChange?.(e);
      }
    } else {
      onChange?.(e);
    }
  };

  return (
    <label className="passcode-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheck}
        disabled={!isPasscodeVerified && store.hasPasscode}
        {...props}
      />
      <span>{children}</span>
      {store.hasPasscode && !isPasscodeVerified && (
        <span className="passcode-required"> (Passcode required)</span>
      )}
    </label>
  );
};

export default PasscodeCheckbox;
