import React from 'react';
import 'font-awesome/css/font-awesome.css';

// Style Components
import SidebarBodyLayout from './styles/SidebarBodyLayout';
import BodyLayout from './styles/BodyLayout';
import SidebarStyles from './styles/SidebarStyles';
import NavigationStyles from './styles/NavigationStyles';

// Components
import Navigation from '../Navigation'
import UtilityTopBar from '../UtilityTopBar';
import Sidebar from '../Sidebar'
import BodyRoutes from '../bodyComponents/BodyRoutes'

type Props = {
  authenticated: boolean,
  authenticating: boolean
  logout: () => mixed,
  createGoal: () => mixed,
}

export const App = (props: Props) => {
  return (
    <SidebarBodyLayout>
      <SidebarStyles>
        <Sidebar
          authenticated={props.authenticated}
          authenticating={props.authenticating}
        />
      </SidebarStyles>

      <BodyLayout>
        <NavigationStyles>
          <Navigation
            authenticated={props.authenticated}
            authenticating={props.authenticating}
            logout={props.logout}
          />
        </NavigationStyles>

        {props.authenticated ? (
          <NavigationStyles>
            <UtilityTopBar
              authenticated={props.authenticated}
              createGoal={props.createGoal}
            />
          </NavigationStyles>
        ) : (
          <div></div>
        )}

        <BodyRoutes
          authenticated={props.authenticated}
        />
      </BodyLayout>
    </SidebarBodyLayout>
  );
};

export default App;
