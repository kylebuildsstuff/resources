/**
*
* ReplaceVehBtn
*
*/

import React from 'react';
import { Link } from 'react-router';
import { vehicleString } from '../../utils/helpers';

import styles from './styles.css';

class ReplaceVehBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownActive: false,
    };
  }

  toggleDropdown = () => {
    this.setState({
      dropdownActive: !this.state.dropdownActive,
    });
  }

  render() {
    if (this.props.vehicles.length < 2) {
      return (
        <Link
          className="btn-small"
          to={`/account/vehicles/${this.props.vehicles[0].vehicle_no}/replace`}
        >Replace Vehicle</Link>
      );
    }
    return (
      <div className={styles.replaceVehBtn}>
        <button className="btn-small" onClick={this.toggleDropdown}>Replace Vehicle</button>
        {
          this.state.dropdownActive && (
            <div className={styles.dropdown}>
              <ul>
                {
                  this.props.vehicles.map(veh =>
                    <li key={veh.vehicle_no}>
                      <Link to={`/account/vehicles/${veh.vehicle_no}/replace`}>
                        {vehicleString(veh)}
                      </Link>
                    </li>
                  )
                }
              </ul>
            </div>
          )
        }
      </div>
    );
  }
}

ReplaceVehBtn.propTypes = {
  policy: React.PropTypes.any,
  vehicles: React.PropTypes.any,
  active: React.PropTypes.any,
};

export default ReplaceVehBtn;
