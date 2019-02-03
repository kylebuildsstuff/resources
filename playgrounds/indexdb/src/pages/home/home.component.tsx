import * as React from 'react';

interface HomeProps {
  ping: () => void;
}

export const Home: React.SFC<HomeProps> = ({ ping }) => {
  return (
    <div>
      Welcome Home
      <button onClick={ping}>Click me</button>
    </div>
  );
};
