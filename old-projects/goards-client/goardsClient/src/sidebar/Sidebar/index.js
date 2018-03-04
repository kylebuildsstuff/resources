import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types'

import SidebarStyles from '../styles/SidebarStyles';

export const Sidebar = (props) => {
  if (props && props.sidebarElements) {
    return (
      <SidebarStyles sidebarIsOpen={props.sidebarIsOpen}>
        {_.map(props.sidebarElements, (value, index) => {
          return React.createElement(
            value,
            {
              key: index,
              authenticated: props.authenticated,
              sidebarIsOpen: props.sidebarIsOpen,
              toggleSidebarIsOpenState: props.toggleSidebarIsOpenState,
              logout: props.logout,
            },
          );
        })}
      </SidebarStyles>
    );
  }
  return (
    <div></div>
  );
}

Sidebar.propTypes = {
  authenticated: PropTypes.bool,
  sidebarIsOpen: PropTypes.bool,
  sidebarElements: PropTypes.array,
  toggleSidebarIsOpenState: PropTypes.func,
  logout: PropTypes.func,
};

export default Sidebar;
