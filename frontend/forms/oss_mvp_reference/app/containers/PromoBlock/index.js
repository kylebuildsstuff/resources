/*
 *
 * PromoBlock
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectGlobalJS } from '../App/selectors';
import MiniLogin from '../../forms/MiniLogin';
import LoggedIn from '../../components/LoggedIn';
import { login } from '../App/actions';

import HomeBanner from '../../assets/homeBanner.jpg';
import RegisterBanner from '../../assets/registerBanner.jpg';

import styles from './styles.css';

export class PromoBlock extends React.Component { // eslint-disable-line
  login = (values) => { // eslint-disable-line
    return new Promise((resolve, reject) => {
      this.props.login(values, resolve, reject);
    });
  }
  render() {
    const loginBlock = (
      <div className={styles.content}>
        <div className={styles.inner}>
          {
            this.props.authed ?
              <LoggedIn /> :
              <MiniLogin onSubmit={this.login} />
          }
        </div>
      </div>
    );
    if (this.props.path === '/') {
      return (
        <div className={styles.promoBlock}>
          {loginBlock}
          <img src={HomeBanner} alt="Home" />
        </div>
      );
    } else if (this.props.path === '/register') {
      return (
        <div className={styles.promoBlock}>
          <img src={RegisterBanner} alt="Register" />
        </div>
      );
    }
    return null;
  }
}

PromoBlock.propTypes = {
  login: React.PropTypes.func,
  authed: React.PropTypes.bool,
  path: React.PropTypes.string,
};

const mapStateToProps = selectGlobalJS();

function mapDispatchToProps(dispatch) {
  return {
    login: (values, resolve, reject) => dispatch(login(values, resolve, reject)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PromoBlock);
