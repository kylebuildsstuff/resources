/*
 *
 * BlockItem
 *
 */

import React from 'react';
import classnames from 'classnames';
import SingleVehicle from '../../components/SingleVehicle';
import SingleDriver from '../../components/SingleDriver';
import SingleProperty from '../../components/SingleProperty';

import cards from '../../styles/cards.css';

export class BlockItem extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      toggled: true,
    };
  }
  toggleItem = () => {
    this.setState({
      toggled: !this.state.toggled,
    });
  }
  render() {
    const {
      single,
      health,
    } = this.props;
    let renderData;

    if (single.first_name) {
      // must be a driver
      renderData = <SingleDriver driver={single} />;
    } else if (single.vehicle_make) {
      // must be a vehicle
      renderData = <SingleVehicle health={health} vehicle={single} />;
    } else {
      // must be a property
      renderData = <SingleProperty property={single} />;
    }
    const itemClass = classnames({
      clearfix: 'clearfix',
      [cards.cardItem]: cards.cardItem,
      [cards.toggled]: !this.state.toggled,
    });
    return (
      <div className={itemClass}>
        <h4 className={cards.toggleTitle} onClick={this.toggleItem}>
          {this.props.title}
        </h4>
        <div>
          {renderData}
        </div>
      </div>
    );
  }
}

BlockItem.propTypes = {
  title: React.PropTypes.string,
  single: React.PropTypes.object,
  health: React.PropTypes.bool,
};

export default BlockItem;
