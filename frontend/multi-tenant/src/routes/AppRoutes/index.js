import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

// import LazyLoad from '../../services/LazyLoad';
import constants from 'constants/app';
import LazyLoad from 'services/LazyLoad';
// import HomePage from '../../pages/HomePage';

export class AppRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact path="/"
          // component={HomePage}
          render={(matchProps) => (
            <LazyLoad
              tenantName={constants.TENANT_NAME}
              moduleName='HomePage'
              // absoluteModulePath='pages/default/HomePage'
              // getComponent={() => import('pages/default/HomePage')}
              {...matchProps}
            />
          )}
        />
      </Switch>
    );
  }
}

export default AppRoutes;
