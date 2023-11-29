import { Dialog } from '@mui/material';
import { ReactNode, useState } from 'react';

type Props = {
  children?: ReactNode;
};

const AGE_VERIFIED = 'age-verified';

const AgeVerification = ({ children }: Props) => {
  const [verified, setVerified] = useState<boolean>(!!localStorage.getItem(AGE_VERIFIED));

  const yes = () => {
    localStorage.setItem(AGE_VERIFIED, 'true');
    setVerified(true);
  };

  const no = () => {
    window.location.href = 'https://www.secondlife.com';
  };

  const doNotWant = () => {
    window.location.href = 'https://www.youtube.com/watch?v=7w5JYp8HgfU';
  };

  if (verified) {
    return null;
  } else {
    return (
      <Dialog open={true} style={{ backgroundColor: 'rgb(191, 191, 191)' }}>
        <div style={{ padding: '10%' }}>
          <h1>Age Verification</h1>
          <p>You must be over the age of 18 to access this website.</p>
          <button style={{ margin: '10px' }} onClick={yes}>
            I am over the age of 18.
          </button>
          <button style={{ margin: '10px' }} onClick={no}>
            I am not over the age of 18.
          </button>
          <button style={{ margin: '10px' }} onClick={doNotWant}>
            Do not want!
          </button>
        </div>
      </Dialog>
    );
  }
};

export default AgeVerification;
