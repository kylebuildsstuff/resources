import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signup } from '../../../AppContainer/actions';
import SignupForm from '../SignupForm';

type Props = {
  signup: () => mixed
};

export class SignupContainer extends React.Component {
  props: Props;
  signup = (formSubmitData: Object) => {
    this.props.signup(formSubmitData)
  }

  render() {
    if (this.props && this.props.authenticated) {
      return <Redirect to="user-home" />
    }
    return (
      <div>
        <SignupForm
          signup={this.signup}
        />
      </div>
    );
  }
};

function mapStateToProps(state: Object) {
  return {};
};

function mapDispatchToProps(dispatch: () => mixed) {
  return {
    signup: (formSubmitData: Object) => dispatch(signup(formSubmitData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
