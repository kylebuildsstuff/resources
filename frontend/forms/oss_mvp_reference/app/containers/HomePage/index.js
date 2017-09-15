/*
 * HomePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PageHeader from '../../components/PageHeader';
import FeatureBlock from '../../components/FeatureBlock';
import { selectGlobalJS } from '../App/selectors';
import { login } from '../App/actions';

import pages from '../../styles/pages.css';

export class HomePage extends React.Component { // eslint-disable-line
  login = (values) => { // eslint-disable-line
    return new Promise((resolve, reject) => {
      this.props.login(values, resolve, reject);
    });
  }
  render() {
    return (
      <div className={pages.homePage}>
        <div className={pages.mainContent}>
          <Helmet title="QuickServe - Home" />
          <PageHeader subTitle="Welcome to" mainTitle="SmartCoverage QuickServe!" />
          <p className="lead">
            <strong>
              Update your auto insurance information online, anytime.
            </strong>
          </p>
          <p>
            QuickServe allows you to access your information when you want. All you need is to provide your policy numbers found on your policy documents. Need help signing up? Call the SmartCoverage team at 1-888-881-8045.
          </p>
          <FeatureBlock />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  login: React.PropTypes.func,
  authed: React.PropTypes.bool,
  health: React.PropTypes.bool,
};

const mapStateToProps = selectGlobalJS();

function mapDispatchToProps(dispatch) {
  return {
    login: (values, resolve, reject) => dispatch(login(values, resolve, reject)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
