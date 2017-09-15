/*
 *
 * AccountManagePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ChangePassword from '../../forms/ChangePassword';
import { changePw } from './actions';

import cards from '../../styles/cards.css';

export class AccountManagePage extends React.Component { // eslint-disable-line

  changePw = (values) => { // eslint-disable-line
    return new Promise((resolve, reject) => {
      this.props.changePw(values, resolve, reject);
    });
  }

  render() {
    const data = this.props.primary;
    return (
      <div>
        <Helmet title="QuickServe - Manage Your Account" />
        <div className={cards.card}>
          <h4 className={cards.hdr}>
            Account Information
          </h4>
          <div className={cards.cardItem}>
            <ul className="list-unstyled">
              <li>
                <strong>Account holder: </strong>
                {data.first_name} {data.last_name}
              </li>
              <li>
                <strong>Email: </strong>
                {data.email}
              </li>
            </ul>
          </div>
        </div>
        <div className={cards.card}>
          <h4 className={cards.hdr}>
            Change Your Password
          </h4>
          <div className={cards.cardItem}>
            <div className={cards.right}>
              <p>Enter a new password with the following requirements:</p>
              <ul>
                <li>Contain at least one number</li>
                <li>Contain at least one uppercase letter</li>
                <li>Be at least 8 characters long</li>
              </ul>
            </div>
            <div className={cards.left}>
              <ChangePassword onSubmit={this.changePw} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AccountManagePage.propTypes = {
  changePw: React.PropTypes.func,
  primary: React.PropTypes.any,
};

function mapDispatchToProps(dispatch) {
  return {
    changePw: (values, resolve, reject) => dispatch(changePw(values, resolve, reject)),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(AccountManagePage);
