import React from 'react';
import PropTypes from 'prop-types';

import ProfileButton from 'sidebar/ProfileButton';

export class ProfileButtonContainer extends React.Component {
  generateAuthenticatedMenuData = () => {
    return [
      {
        toPath: '/',
        plainText: 'Logout',
        order: 1,
        handleClick: 'logout',  // name of the action to be invoked
      },
    ];
  }

  generateUnauthenticatedMenuData = () => {
    return [
      {
        toPath: '/register',
        plainText: 'Register',
        order: 1,
      },
      {
        toPath: '/login',
        plainText: 'Login',
        order: 2,
      },
    ];
  }

  render() {
    if (this.props) {
      return (
        <ProfileButton
          authenticated={this.props.authenticated}
          sidebarIsOpen={this.props.sidebarIsOpen}
          toggleSidebarIsOpenState={this.props.toggleSidebarIsOpenState}
          menuData={this.props.authenticated ? this.generateAuthenticatedMenuData() : this.generateUnauthenticatedMenuData()}
          logout={this.props.logout}
        />
      );
    }
    return (
      <div>Loading</div>
    );
  }
}

ProfileButtonContainer.propTypes = {
  authenticated: PropTypes.bool,
  sidebarIsOpen: PropTypes.bool,
  toggleSidebarIsOpenState: PropTypes.func,
  logout: PropTypes.func,
};

export default ProfileButtonContainer;
