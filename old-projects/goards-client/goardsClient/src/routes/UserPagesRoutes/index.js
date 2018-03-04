import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import LazyLoader from 'services/LazyLoader';

export class UserPagesRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/user"
          render={(matchProps) => (
            <LazyLoader
              getComponent={() => import('pages/userPages/UserProfile')}
              {...matchProps}
            />
          )}
        />
        <Route
          path="/user/cards"
          render={(matchProps) => (
            <LazyLoader
              getComponent={() => import('pages/userPages/CardTable')}
              {...matchProps}
            />
          )}
        />
      </Switch>
    );
  }
}

export default UserPagesRoutes;
