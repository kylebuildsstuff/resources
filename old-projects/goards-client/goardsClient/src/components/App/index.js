import React from 'react';
import PropTypes from 'prop-types';

import AppRoutes from 'routes/AppRoutes';
import SidebarContainer from 'containers/SidebarContainer';

import SidebarPageLayout from 'styles/SidebarPageLayout';

export const App = (props) => {
  return (
    <SidebarPageLayout>
      <SidebarContainer
        authenticated={props.authenticated}
        authenticating={props.authenticating}
        logout={props.logout}
      />
      <AppRoutes
        authenticated={props.authenticated}
        authenticating={props.authenticating}
        logout={props.logout}
      />
    </SidebarPageLayout>
  )
}

App.propTypes = {
  authenticating: PropTypes.bool,
  authenticated: PropTypes.bool,
  logout: PropTypes.func,
};

export default App;
