import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';

import LazyLoader from 'services/LazyLoader';

export class RootRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact path="/"
          render={(matchProps) => (
            <LazyLoader
              getComponent={() => import('containers/AppContainer')}
              {...matchProps}
            />
          )}
        />
        <Route
          path="/about"
          render={(matchProps) => (
            <LazyLoader
              getComponent={() => import('components/About')}
              {...matchProps}
            />
          )}
        />
      </Switch>
    );
  }
}

export default RootRoutes;
