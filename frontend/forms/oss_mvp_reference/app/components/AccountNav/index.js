/**
*
* AccountNav
*
*/

import React from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

import styles from './styles.css';

function AccountNav(props) {
  const addVehiclePage = new RegExp('add-vehicle').test(props.pathname);
  return (
    <div className={styles.accountNav}>
      <Link
        activeClassName={styles.current}
        to="/account/auto"
        className={props.params.vehicle_id || addVehiclePage ? styles.current : ''}
      >
        <FontAwesome name="car" /> <span className={styles.title}>Auto</span>
      </Link>{' '}
      <Link activeClassName={styles.current} to="/account/property">
        <FontAwesome name="home" /> <span className={styles.title}>Property</span>
      </Link>{' '}
      <Link activeClassName={styles.current} to="/account/claims">
        <FontAwesome name="file-text-o" /> <span className={styles.title}>Claims</span>
      </Link>{' '}
      <Link activeClassName={styles.current} to="/account/billing">
        <FontAwesome name="usd" /> <span className={styles.title}>Billing</span>
      </Link>{' '}
      <Link className="pull-right" activeClassName={styles.current} to="/account/manage">
        <FontAwesome name="gear" /> <span className={styles.title}>Settings</span>
      </Link>
    </div>
  );
}

AccountNav.propTypes = {
  params: React.PropTypes.object,
  pathname: React.PropTypes.string,
};

export default AccountNav;
