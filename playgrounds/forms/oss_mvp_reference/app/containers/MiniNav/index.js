/**
*
* MiniNav
*
*/

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { selectUi } from '../App/selectors';
import { activateModal } from '../App/actions';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';

import styles from './styles.css';

export class MiniNav extends React.Component { // eslint-disable-line

  logout = () => {
    this.props.activateModal(true, 'logout', 'Are you sure you wish to logout?', 'Click yes to confirm.');
    this.props.toggleMenu();
  }

  render() {
    const classNames = classnames(styles.miniNav, {
      [styles.active]: this.props.menuActive,
    });
    return (
      <div className={classNames}>
        <h5>{this.props.username}</h5>
        <ul>
          <li className={styles.login}>
            <Link onClick={this.props.toggleMenu} to="/account">
              <FontAwesome name="user" /> Your Account
            </Link>
          </li>
          <li className={styles.signup}>
            <button onClick={this.logout}>
              <FontAwesome name="unlock" /> Log out
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

MiniNav.propTypes = {
  menuActive: React.PropTypes.bool,
  authed: React.PropTypes.bool,
  username: React.PropTypes.string,
  activateModal: React.PropTypes.func,
  onLogout: React.PropTypes.func,
  toggleMenu: React.PropTypes.func,
};

const mapStateToProps = selectUi();

function mapDispatchToProps(dispatch) {
  return {
    activateModal: (bool, path, title, body) => dispatch(activateModal(bool, path, title, body)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniNav);
