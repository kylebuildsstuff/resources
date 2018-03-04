import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from 'containers/AppContainer/actions';

export const withDropdownOnClickHandlers = (Component) => {
  // 'location' and 'history' objects are not able
  // to serialize functions for some resaon so this helper
  // takes in the onClick handler names and returns a more
  // complete menuData object into a DropdownMenuContainer
  // that contains handlers
  class InfusedDropdownMenu extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        menuData: [],
      };
    }

    componentDidMount() {
      if (this.props && this.props.location && this.props.location.state && this.props.location.state.menuData) {
        this.setState({
          menuData: this.returnNewMenuData(this.props.location.state.menuData),
        });
      }
    }

    returnNewMenuData = (menuData) => {
      let newMenuData = [];
      if (menuData) {
        _.forEach(menuData, (menuItem) => {
          let newMenuItem = Object.assign({}, menuItem);
          if (menuItem.handleClick) {
            newMenuItem.handleClick = this.props[menuItem.handleClick]
            newMenuData.push(newMenuItem);
          }
        });
      }
      return _.isEmpty(newMenuData) ? menuData : newMenuData;
    }

    render() {
      if (this.props) {
        return <Component {...this.props} {...this.state} />
      }
      return (
        <div>Loading</div>
      );
    }
  }

  InfusedDropdownMenu.propTypes = {
    location: PropTypes.object,
  };

  function mapDispatchToProps(dispatch) {
    return {
      logout: () => dispatch(logout()),
    };
  }

  return withRouter(connect(null, mapDispatchToProps)(InfusedDropdownMenu));
}

export default withDropdownOnClickHandlers;
