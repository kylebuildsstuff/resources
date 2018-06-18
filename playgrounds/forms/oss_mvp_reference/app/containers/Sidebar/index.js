/**
*
* Sidebar
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { selectUi } from '../App/selectors';
import { activateModal } from '../App/actions';
import classnames from 'classnames';

import styles from './styles.css';

export class Sidebar extends React.Component { // eslint-disable-line

  logout = () => {
    this.props.activateModal(true, 'logout', 'Are you sure you wish to logout?', 'Click yes to confirm.');
    this.props.toggleMenu();
  }

  render() {
    const classNames = classnames(styles.sidebar, {
      [styles.menuActive]: this.props.menuActive,
    });
    return (
      <div className={classNames}>
        <button className={styles.toggle} onClick={this.props.toggleMenu}>
          <small><FontAwesome name="bars" /> close menu</small>
        </button>

        {this.props.authed ? (
          <div className={styles.account}>
            <Link activeClassName={styles.current} onClick={() => this.props.toggleMenu()} activeClassName={styles.current} to="/account">
              <FontAwesome name="user" /> Your Account
            </Link>
            <button onClick={this.logout}>
              <FontAwesome name="unlock" /> Logout
            </button>
          </div>
        ) : (
          <div className={styles.account}>
            <Link onClick={this.props.toggleMenu} className={styles.loginLink} activeClassName={styles.current} to="/login">
              <FontAwesome name="lock" /> Log In
            </Link>
            <Link onClick={this.props.toggleMenu} activeClassName={styles.current} to="/register">
              <FontAwesome name="user" /> Sign Up
            </Link>
          </div>
        )}

        <hr />

        <div className={styles.siteNav}>
          <Link onClick={this.props.toggleMenu} activeClassName={styles.current} to={this.props.authed ? '/account' : '/'}>Home</Link>
          <Link onClick={this.props.toggleMenu} activeClassName={styles.current} to="/faqs">Help</Link>
          <Link onClick={this.props.toggleMenu} activeClassName={styles.current} to="/contact">Contact</Link>
        </div>

        <div className={styles.contact}>
          <address>
            SmartCoverage Insurance<br />
            P.O. Box 489, Station A<br />
            Windsor, ON N9A 6M6<br />
            <FontAwesome name="phone" /> 1-888-881-8045
          </address>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  authed: React.PropTypes.bool,
  menuActive: React.PropTypes.bool,
  ui: React.PropTypes.object,
  toggleMenu: React.PropTypes.func,
  activateModal: React.PropTypes.func,
};

const mapStateToProps = selectUi();

function mapDispatchToProps(dispatch) {
  return {
    activateModal: (bool, path, title, body) => dispatch(activateModal(bool, path, title, body)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
