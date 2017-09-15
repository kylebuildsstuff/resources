/*
 *
 * CardBlock
 *
 */

import React from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import PolicyHeader from '../../components/PolicyHeader';
import PolicyDropdown from '../../components/PolicyDropdown';
import AddressBlock from '../../components/AddressBlock';
import DriversBlock from '../../components/DriversBlock';
import VehiclesBlock from '../../components/VehiclesBlock';
import ReplaceVehBtn from '../../components/ReplaceVehBtn';

import cards from '../../styles/cards.css';

export class CardBlock extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      dropdownVisible: false,
    };
  }

  handlePinkClick = () => {
    this.props.fetchAllPinkSlips(this.props.policy.id);
  }

  handleDownloadPinkClick = () => {
    this.props.downloadAllPinkSlips(this.props.policy.id);
  }

  togglePolicyDropdown = () => {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible,
    });
  }

  render() {
    const {
      primary,
      policy,
      health,
    } = this.props;

    let vehicles;
    let drivers;
    let address;

    if (
      policy.line_of_business === 'auto' &&
      policy.driver.length > 0 &&
      policy.vehicle.length > 0
    ) {
      address = <AddressBlock health={health} primary={primary} />;
      vehicles = <VehiclesBlock health={health} vehicles={policy.vehicle} />;
      drivers = <DriversBlock drivers={policy.driver} />;
    } else {
      vehicles = <h5>No vehicles on this policy.</h5>;
      drivers = <h5>No drivers on this policy.</h5>;
    }
    return (
      <div className={cards.card}>
        <PolicyHeader
          policy={this.props.policy}
          allowed={this.props.policy.pink_slip_allowed}
          download={this.handleDownloadPinkClick}
          isFetching={this.props.isFetching}
          togglePolicyDropdown={this.togglePolicyDropdown}
        />
        <div className={cards.cardInner}>
          <div className={cards.cardBlock}>
            <div className={cards.cardTitle}>
              <FontAwesome name="home" /> Address
              {
                health && (
                  <Link className="btn-small" to="/account/change-your-address">
                    Change Address
                  </Link>
                )
              }
            </div>
          </div>
          {address}
          <div className={cards.cardBlock}>
            <div className={cards.cardTitle}>
              {
                health && (
                  <div className="clearfix">
                    <ReplaceVehBtn
                      policy={this.props.policy}
                      vehicles={policy.vehicle}
                    />
                    <Link
                      className="btn-small"
                      to="/account/vehicles/add-vehicle"
                    >
                      Add Vehicle
                    </Link>
                    <FontAwesome name="car" /> Vehicles
                  </div>
                )
              }
            </div>
          </div>
          {vehicles}
          <div className={cards.cardBlock}>
            <div className={cards.cardTitle}>
              <FontAwesome name="user" /> Drivers
            </div>
          </div>
          {drivers}
        </div>
        <PolicyDropdown
          active={this.state.dropdownVisible}
          allowed={this.props.policy.pink_slip_allowed}
          isFetching={this.props.isFetching}
          download={this.handleDownloadPinkClick}
          vehicles={policy.vehicle}
        />
      </div>
    );
  }
}

CardBlock.propTypes = {
  policy: React.PropTypes.object,
  global: React.PropTypes.object,
  primary: React.PropTypes.object,
  health: React.PropTypes.bool,
  fetchAllPinkSlips: React.PropTypes.any,
  downloadAllPinkSlips: React.PropTypes.any,
  isFetching: React.PropTypes.any,
};

export default CardBlock;
