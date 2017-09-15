/*
 *
 * AccountVehiclesPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import SingleProperty from '../../components/SingleProperty';

export class AccountPropertyPage extends React.Component { // eslint-disable-line
  render() {
    const propertyPolicies = this.props.policies.filter(policy =>
      policy.line_of_business === 'hab'
    );
    if (propertyPolicies.length !== 0) {
      return (
        <div>
          <Helmet title="QuickServe - Your Properties" />
          {
            propertyPolicies.map(pol =>
              <SingleProperty
                key={pol.id}
                policy={pol}
                primary={this.props.primary}
              />
            )
          }
        </div>
      );
    }
    return (
      <div>
        <p>Get a quote online at <a href="https://quote.smartcoverage.ca/auto/get-started/" target="_blank">SmartCoverage.ca</a></p>
      </div>
    );
  }
}

AccountPropertyPage.propTypes = {
  isFetching: React.PropTypes.bool,
  primary: React.PropTypes.object,
  policies: React.PropTypes.array,
};

// const mapStateToProps = selectRegisterPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(AccountPropertyPage);
