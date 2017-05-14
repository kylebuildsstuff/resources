// @flow
import React from 'react';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';

import {
  editUser,
} from '../../../AppContainer/actions';

import UserSettingsForm from '../UserSettingsForm';

type Props = {
  user: {
    id: number
  },
  match: Object,
  history: Object,
  location: Object,
  editUser: () => mixed,
  resetForm: () => mixed,
}

export class UserSettingsContainer extends React.Component {
  props: Props;
  editUser = (formSubmitData: Object) => {
    this.props.editUser(this.props.user.id, formSubmitData, localStorage.getItem('jwt'));
    this.props.resetForm('userSettings');
  }

  render() {
    return (
      <UserSettingsForm
        user={this.props.user}
        match={this.props.match}
        history={this.props.history}
        location={this.props.location}
        editUser={this.editUser}
      />
    );
  }
}

function mapDispatchToProps(dispatch: () => mixed) {
  return {
    editUser: (userId = undefined, formSubmitData = {}, token = undefined) => dispatch(editUser(userId, formSubmitData, token)),
    resetForm: (formName: string) => dispatch(resetForm(formName)),
  };
}

export default connect(null, mapDispatchToProps)(UserSettingsContainer);
