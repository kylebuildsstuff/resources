/*
 *
 * AccountFormSubmitSuccessPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { selectAccountPage } from '../AccountPage/selectors';
import AccountFormSubmitSuccess from '../../components/AccountFormSubmitSuccess';

export class AccountFormSubmitSuccessPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet title="QuickServe - Your Request Was Submitted" />
        <AccountFormSubmitSuccess
          willShowGenericMessage={this.props.genMsgFormSubmitSuccess}
        />
      </div>
    );
  }
}

AccountFormSubmitSuccessPage.propTypes = {
  genMsgFormSubmitSuccess: React.PropTypes.any,
};

function mapStateToProps(state) {
  return ({
    genMsgFormSubmitSuccess: selectAccountPage()(state).genMsgFormSubmitSuccess,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountFormSubmitSuccessPage);
