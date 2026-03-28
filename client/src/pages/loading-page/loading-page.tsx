import { JSX } from 'react';

function LoadingPage(): JSX.Element {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
      fontWeight: 'bold'
    }}
    >
      Loading...
    </div>
  );
}

export { LoadingPage };