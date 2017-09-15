/**
*
* AddressChange
*
*/

import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form/immutable';

import { setFormInProgress } from '../../containers/App/actions';
import {
  selectVehMakes,
  selectVehModels,
  selectAddresses,
} from '../../containers/AccountPage/selectors';
import {
  fetchVehMakes,
  fetchVehModels,
  fetchAddresses,
  postAddressChangeForm,
} from '../../containers/AccountPage/actions';
import PageOne from './PageOne';
import PageTwo from './PageTwo';

class AddressChange extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  onSubmit = (values) => {
    this.props.setFormInProgress(false);
    const formPolicyNumber = values.toJS().policy_number;

    const policy = this.props.global.policies.filter((pol) => {
      if (pol.policy_number && (pol.policy_number === formPolicyNumber)) {
        return true;
      }
      return false;
    });

    const policyId = policy.length === 1 ? policy[0].id : '';
    const formValues = Object.assign({}, values.toJS(), { policy_id: policyId });

    return new Promise((resolve, reject) => {
      this.props.postAddressChangeForm(formValues, resolve, reject);
    });
  }

  returnValidAutoPolicies = (policies) => {
    const validPolicies = [];
    policies.map((policy) => { // eslint-disable-line
      if (policy.type === 'auto') {
        validPolicies.push(policy);
      }
    });
    return validPolicies;
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
    // this.props.setFormFilling(true);
  }

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { page } = this.state;
    const { policies } = this.props.global;
    const autoPolicies = this.returnValidAutoPolicies(policies);
    return (
      <div>
        {page === 1 &&
          <PageOne
            getFormValues={this.props.values}
            onSubmit={this.nextPage}
            policies={policies}
            primary={this.props.primary}
            autoPolicies={autoPolicies}
            {...this.props}
          />
        }
        {page === 2 &&
          <PageTwo
            getFormValues={this.props.values}
            onSubmit={this.onSubmit}
            policies={policies}
            primary={this.props.primary}
            autoPolicies={autoPolicies}
            previousPage={this.previousPage}
            {...this.props}
          />
        }
      </div>
    );
  }
}

AddressChange.propTypes = {
  values: React.PropTypes.any,
  global: React.PropTypes.any,
  vehicle: React.PropTypes.any,
  policies: React.PropTypes.any,
  autoPolicies: React.PropTypes.any,
  primary: React.PropTypes.any,
  fetchVehMakes: React.PropTypes.func,
  fetchVehModels: React.PropTypes.func,
  fetchAddresses: React.PropTypes.func,
  vehMakes: React.PropTypes.any,
  vehModels: React.PropTypes.any,
  addresses: React.PropTypes.any,
  postAddressChangeForm: React.PropTypes.func,
  setFormFilling: React.PropTypes.func,
  setFormInProgress: React.PropTypes.func,
};

function mapStateToProps(state) {
  return ({
    values: getFormValues('addressChange')(state) || Immutable.Map(), // eslint-disable-line
    vehMakes: selectVehMakes()(state),
    vehModels: selectVehModels()(state),
    addresses: selectAddresses()(state),
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchVehMakes: (year) => dispatch(fetchVehMakes(year)),
    fetchVehModels: (year, make) => dispatch(fetchVehModels(year, make)),
    fetchAddresses: (postalCode) => dispatch(fetchAddresses(postalCode)),
    postAddressChangeForm: (formValues, resolve, reject) => dispatch(postAddressChangeForm(formValues, resolve, reject)),
    setFormInProgress: (bool) => dispatch(setFormInProgress(bool)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressChange);
