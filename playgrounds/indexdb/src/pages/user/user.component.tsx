import * as React from 'react';

interface UserProps {
  visitHome: () => void;
}

export const User: React.SFC<UserProps> = ({ visitHome }) => {
  return (
    <React.Fragment>
      <div>User: </div>
      <button onClick={visitHome}>Home</button>
    </React.Fragment>
  );
};

export default User;
