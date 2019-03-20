import * as React from 'react';

interface AboutProps {
  visitHome: () => void;
}

export const About: React.SFC<AboutProps> = ({ visitHome }) => {
  return (
    <React.Fragment>
      <div>I am the about page</div>
      <button onClick={visitHome}>visitHome</button>
    </React.Fragment>
  );
};
