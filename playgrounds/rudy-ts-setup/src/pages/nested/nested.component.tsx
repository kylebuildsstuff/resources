import * as React from 'react';

interface NestedProps {
  visitHome: () => void;
}

export const Nested: React.SFC<NestedProps> = ({ visitHome }) => {
  return (
    <React.Fragment>
      <div>I am the nested page</div>
      <button onClick={visitHome}>visitHome</button>
    </React.Fragment>
  );
};
