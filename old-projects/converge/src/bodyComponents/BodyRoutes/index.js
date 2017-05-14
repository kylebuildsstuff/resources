// @flow
// Libraries
import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import _ from 'lodash';

// Styles
import BodyLayout from './styles/BodyLayout';

// Components
import Home from '../Home';
import About from '../About';
import ErrorPage from '../ErrorPage';
// import GoalCardModal from '../userHomeComponents/GoalCardModal';

// Containers
import withAuthentication from '../../services/withAuthentication';
import SignupContainer from '../signupComponents/SignupContainer';
import LoginContainer from '../loginComponents/LoginContainer';
import UserHomeContainer from '../userHomeComponents/UserHomeContainer';

type Props = {
  authenticated: boolean,
  authenticating: boolean
};

export class BodyRoutes extends React.Component {
  props: Props;
  render() {
    return (
      <BodyLayout>
        <Switch>
          {/* Generic Body Routes */}
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route
            path="/signup"
            render={
              (matchProps: Object) => (
                <SignupContainer
                  authenticated={this.props.authenticated}
                  {...matchProps}
                />
              )
            }
          />
          <Route
            path="/login"
            render={
              (matchProps: Object) => (
                <LoginContainer
                  authenticated={this.props.authenticated}
                  {...matchProps}
                />
              )
            }
          />

          {/* Authenticated Routes */}
          <Route
            path="/user-home"
            render={(matchProps: Object) => {
              const combinedProps = Object.assign(
                {}, {...matchProps}
              );
              return (
                React.createElement(
                  withAuthentication(UserHomeContainer),
                  {...combinedProps},
                )
              );
            }}
          />

          {/* Miscellaneous Routes */}
          <Route component={ErrorPage} />
        </Switch>
        {/* <Route path="/user-home" component={GoalCardModal} /> */}
        {/* {isModal ? <Route path='/img/:id' component={Modal} /> : null} */}
      </BodyLayout>
    );
  }
};

export default BodyRoutes;
