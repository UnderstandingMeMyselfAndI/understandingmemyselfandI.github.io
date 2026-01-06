import { useState } from 'react';
import ChangePin from './ChangePin';
import PasswordHintSetup from './PasswordHintSetup';

const SecuritySettings = () => {
  const [updated, setUpdated] = useState(false);

  return (
    <div>
      <h2>Security Settings</h2>

      <ChangePin onSuccess={() => setUpdated(true)} />
      <PasswordHintSetup onSuccess={() => setUpdated(true)} />

      {updated && <p style={{ color: 'green' }}>Settings updated!</p>}
    </div>
  );
};

export default SecuritySettings;
