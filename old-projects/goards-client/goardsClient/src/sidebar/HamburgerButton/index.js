import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-fontawesome';
import SidebarButtonStyles from 'sidebar/styles/SidebarButtonStyles';

export const HamburgerButton = (props) => {
  return (
    <SidebarButtonStyles onClick={props.toggleSidebarIsOpenState}>
      <Icon name="bars" size="2x" />
    </SidebarButtonStyles>
  );
}

HamburgerButton.propTypes = {
  isOpen: PropTypes.bool,
  toggleSidebarIsOpenState: PropTypes.func,
};

export default HamburgerButton;
