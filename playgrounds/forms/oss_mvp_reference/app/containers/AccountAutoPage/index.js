/*
 *
 * AccountAutoPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import CardBlock from '../CardBlock';
import { selectIsFetching } from '../AccountPage/selectors';
import {
    fetchAllPinkSlips,
    downloadAllPinkSlips,
} from '../AccountPage/actions';

export class AccountAutoPage extends React.Component { // eslint-disable-line
  render() {
    const autoPols = this.props.policies.filter(pol =>
      pol.line_of_business === 'auto'
    );
    if (autoPols.length === 0) {
      return (
        <div>
          <p>Get a quote online at <a href="https://quote.smartcoverage.ca/auto/get-started/" target="_blank">SmartCoverage.ca</a></p>
        </div>
      );
    }
    const {
      policies,
      primary,
      isFetching,
    } = this.props;
    return (
      <div>
        <Helmet title="QuickServe - Your Vehicles" />
        {
          policies.filter(policy =>
            policy.type === 'auto'
          ).map(pol =>
            <CardBlock
              health={this.props.global.health}
              key={pol.id}
              policy={pol}
              primary={primary}
              isFetching={isFetching}
              fetchAllPinkSlips={this.props.fetchAllPinkSlips}
              downloadAllPinkSlips={this.props.downloadAllPinkSlips}
            />
          )
        }
      </div>
    );
  }
}

AccountAutoPage.propTypes = {
  policies: React.PropTypes.any,
  isFetching: React.PropTypes.any,
  fetchAllPinkSlips: React.PropTypes.any,
  downloadAllPinkSlips: React.PropTypes.any,
  primary: React.PropTypes.object,
  global: React.PropTypes.object,
};

function mapStateToProps(state) {
  return ({
    isFetching: selectIsFetching()(state),
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllPinkSlips: (policyId) => dispatch(fetchAllPinkSlips(policyId)),
    downloadAllPinkSlips: (policyId) => dispatch(downloadAllPinkSlips(policyId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountAutoPage);
