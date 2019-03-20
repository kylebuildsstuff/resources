import * as React from 'react';

interface HomeProps {
  ping: () => void;
  visitAbout: () => void;
  visitUser: (userId: number) => void;
  visitNested: () => void;
}

export const Home: React.SFC<HomeProps> = ({
  ping,
  visitAbout,
  visitUser,
  visitNested,
}) => {
  return (
    <React.Fragment>
      <div>Welcome Home</div>
      <button onClick={ping}>Click me</button>
      <button onClick={visitAbout}>About Page</button>
      <button onClick={() => visitUser(312)}>User Page</button>
      <button onClick={visitNested}>Nested Page</button>
    </React.Fragment>
  );
};
