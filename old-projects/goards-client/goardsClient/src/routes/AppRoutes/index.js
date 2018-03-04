import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';

import LazyLoader from 'services/LazyLoader';
import { withAuthentication } from 'services/withAuthentication';

export class AppRoutes extends React.Component {
  previousLocation = this.props.location; // ES8/ES9 stuff - object properties, the same as defining methods on classes like: method = () => {...}
  // Binding properties and methods this way puts it
  // on the object's prototype.
  // Method properties defined with arrow functions create
  // no 'this' of their own and therefore must be bound
  // to the component IF needed, like in cases of
  // 'super' calls.

  componentWillUpdate(nextProps) {
    // Modal logic:
    // If route leads to modal: create discrepency between previousLocation and location
    // so I am able to trick the <Route /> and <Router /> to render both routes simultaneously.
    const { location } = this.props;
    if (
      // POP state gets triggered when user clicks the 'back' or 'forward' button only
      nextProps.history.action !== 'POP' && // not initial render
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = location; // If it's NOT a modal, previousLocation === location
    }
  }

  render() {
    const { location, authenticated, authenticating } = this.props;
    let isModal = !!( // coerces to and retuns boolean
      location.state &&
      location.state.modal
    );
    if (isModal && this.previousLocation === location) {
      isModal = false;
      return <Redirect to={{ pathname: `/`, state: { modal: false } }} />
    }
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route
            exact path="/"
            render={(matchProps) => (
              <LazyLoader
                getComponent={() => import('pages/appPages/About')}
                {...matchProps}
              />
            )}
          />
          <Route
            path="/login"
            render={(matchProps) => (
              <LazyLoader
                getComponent={() => import('containers/LoginContainer')}
                authenticated={authenticated}
                authenticating={authenticating}
                {...matchProps}
              />
            )}
          />
          <Route
            path="/register"
            render={(matchProps) => (
              <LazyLoader
                getComponent={() => import('containers/RegisterContainer')}
                authenticated={authenticated}
                authenticating={authenticating}
                {...matchProps}
              />
            )}
          />
          <Route
            path="/user"
            render={(matchProps) => {
              const combinedProps = Object.assign(
                {},
                {...matchProps},
                { authenticated: authenticated },
                { authenticating: authenticating },
                { getComponent: () => import('containers/UserPagesContainer') }
              );
              return (
                React.createElement(
                  withAuthentication(LazyLoader),
                  {...combinedProps},
                )
              );
            }}
          />
          <Route
            render={(matchProps) => (
              <LazyLoader
                getComponent={() => import('pages/appPages/ErrorPage')}
                {...matchProps}
              />
            )}
          />
        </Switch>
        {/*
          DropdownMenu is a modal implemented with React-Router.
          uses Browser's history API and the Router's location object and state.
          if location.state.modal: return a previousLocation and location in
          a way such that the Router will render both routes simultaneously.
        */}
        {isModal ? (
          <Route
            path="/profile"
            render={(matchProps) => (
              <LazyLoader
                getComponent={() => import('containers/DropdownMenuContainer')}
                {...matchProps}
              />
            )}
          />
        ) : null}
      </div>
    );
  }
}

AppRoutes.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  authenticating: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default withRouter(AppRoutes);
