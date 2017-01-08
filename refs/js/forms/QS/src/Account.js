import React, { Component } from 'react';
import { Link, Match } from 'react-router';
import { connect } from 'react-redux';
import { apiRequest } from './actions';
import { contactSelector, policiesSelector, autoPoliciesSelector } from './selectors';
import ChangeAddress from './ChangeAddress';
import Policy from './Policy';

import './Page.css';

class Account extends Component {

  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
      <div className="Page">
        Account page
        {
          this.props.policies.map(pol =>
            <Policy key={pol.id} policy={pol} />
          )
        }
        <hr />
        <Link to="/account/change-your-address">Change Your Address</Link>
        <Match pattern="/account/change-your-address" component={ChangeAddress} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contact: contactSelector(state),
    policies: policiesSelector(state),
    autoPolicies: autoPoliciesSelector(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(apiRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
