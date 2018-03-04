import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-fontawesome';
import {
  Link,
} from 'react-router-dom';

import SidebarButtonStyles from 'sidebar/styles/SidebarButtonStyles';
import SidebarButtonTextStyles from 'sidebar/styles/SidebarButtonTextStyles';

export class ProfileButton extends React.Component {
  render() {
    return (
      <Link
        to={{
          pathname: `/profile`, // links to a modal
          state: {
            modal: true,
            menuData: this.props.menuData,
          }
        }}
      >
        <SidebarButtonStyles
          sidebarIsOpen={this.props.sidebarIsOpen}
        >
          <Icon name="user" size="2x" />
          <SidebarButtonTextStyles sidebarIsOpen={this.props.sidebarIsOpen}>Profile</SidebarButtonTextStyles>
        </SidebarButtonStyles>
      </Link>
    );
  }
}

ProfileButton.propTypes = {
  authenticated: PropTypes.bool,
  sidebarIsOpen: PropTypes.bool,
  menuData: PropTypes.array,
  logout: PropTypes.func,
};

export default ProfileButton;
