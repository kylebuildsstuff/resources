/**
*
* Header
*
*/

import React from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';

import MiniNav from '../../containers/MiniNav';
import mast from '../../tenant/masthead.svg';
import mastMob from '../../tenant/masthead-icon.svg';
import vars from '../../tenant/vars';

import styles from './styles.css';

function Header(props) {
  const classNames = classnames(styles.basicNav, {
    [styles.pushed]: props.authed,
  });
  const toggleClasses = classnames(styles.toggle, {
    [styles.active]: props.authed,
  });
  return (
    <div className={styles.header}>
      <div className="container">
        <button onClick={props.toggleMenu} className={toggleClasses}>
          {
            props.authed ? <FontAwesome name="user" /> : <FontAwesome name="bars" />
          }
        </button>
        {
          props.authed ? '' : (
            <ul className={styles.acctNav}>
              <li>
                <Link to="/login" className="btn-nav">
                  <FontAwesome name="lock" />Log In
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn-nav">
                  <FontAwesome name="user" />Sign Up
                </Link>
              </li>
            </ul>
          )
        }
        <ul className={classNames}>
          <li>
            <Link to="/faqs">Help</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <Link className={styles.link} to={props.authed ? '/account' : '/'}>
          <mast className={styles.mast} src={mast} alt={vars.tenantName} />
          <img className={styles.mastMob} src={mastMob} alt={vars.tenantName} />
        </Link>
        {
          props.authed &&
            <MiniNav
              authed={props.authed}
              toggleMenu={props.toggleMenu}
              username={props.username}
            />
        }
      </div>
    </div>
  );
}

Header.propTypes = {
  authed: React.PropTypes.bool,
  toggleMenu: React.PropTypes.func,
  username: React.PropTypes.string,
  onLogout: React.PropTypes.func,
  isActive: React.PropTypes.bool,
};

export default Header;
