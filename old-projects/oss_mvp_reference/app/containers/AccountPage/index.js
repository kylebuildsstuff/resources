/*
 *
 * AccountPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectGlobalJS } from '../App/selectors';
import { requestAcctData } from '../App/actions';
import LoadingSpinner from '../../containers/LoadingSpinner';
import AccountNotify from '../../components/AccountNotify';
import AccountNav from '../../components/AccountNav';

export class AccountPage extends React.Component { // eslint-disable-line
  componentDidMount() {
    this.props.getData();
  }

  render() {
    let mainContent;

    if (typeof this.props.global.primary.first_name === 'undefined' &&
        this.props.global.policies.length === 0) {
      mainContent = <LoadingSpinner />;
    } else {
      mainContent = React.Children.map(this.props.children, (child) =>
        React.cloneElement(child, {
          global: this.props.global,
          primary: this.props.global.primary,
          policies: this.props.global.policies,
        })
      );
    }
    return (
      <div>
        <AccountNav params={this.props.params} pathname={this.props.location.pathname} />
        {!this.props.global.health && <AccountNotify msg="Service requests are currently unavailable" />}
        {mainContent}
      </div>
    );
  }
}

AccountPage.propTypes = {
  getData: React.PropTypes.func,
  dispatch: React.PropTypes.func,
  global: React.PropTypes.object,
  primary: React.PropTypes.object,
  policies: React.PropTypes.any,
  location: React.PropTypes.object,
  children: React.PropTypes.object,
  params: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  global: selectGlobalJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(requestAcctData()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
