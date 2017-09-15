/**
*
* VehicleSubstitution
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
  postVehSubForm,
} from '../../containers/AccountPage/actions';
import PageOne from './PageOne';
import PageTwo from './PageTwo';

class VehicleSubstitution extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  onSubmit = (values) => {
    this.props.setFormInProgress(false);
    const formValues = Object.assign({}, values.toJS(), { policy_id: this.props.policy.id, adding_vehicle_year: Number(values.toJS().adding_vehicle_year) });

    return new Promise((resolve, reject) => {
      this.props.postVehSubForm(formValues, resolve, reject);
    });
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
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
            policy={this.props.policy}
            {...this.props}
          />
        }
        {page === 2 &&
          <PageTwo
            getFormValues={this.props.values}
            onSubmit={this.onSubmit}
            policies={policies}
            autoPolicies={autoPolicies}
            previousPage={this.previousPage}
            primary={this.props.primary}
            {...this.props}
          />
        }
      </div>
    );
  }
}

VehicleSubstitution.propTypes = {
  values: React.PropTypes.any,
  global: React.PropTypes.any,
  change: React.PropTypes.any,
  vehicle: React.PropTypes.any,
  policies: React.PropTypes.any,
  policy: React.PropTypes.any,
  fetchVehMakes: React.PropTypes.func,
  fetchVehModels: React.PropTypes.func,
  fetchAddresses: React.PropTypes.func,
  vehMakes: React.PropTypes.any,
  vehModels: React.PropTypes.any,
  addresses: React.PropTypes.any,
  primary: React.PropTypes.any,
  postVehSubForm: React.PropTypes.any,
  setFormInProgress: React.PropTypes.any,
};

function mapStateToProps(state) {
  return ({
    values: getFormValues('vehicleSubstitution')(state) || Immutable.Map(), // eslint-disable-line
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
    postVehSubForm: (formValues, resolve, reject) => dispatch(postVehSubForm(formValues, resolve, reject)),
    setFormInProgress: (bool) => dispatch(setFormInProgress(bool)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleSubstitution);
