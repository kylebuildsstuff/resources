import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-fontawesome';
import {
  Link
} from 'react-router-dom';

import SidebarButtonStyles from 'sidebar/styles/SidebarButtonStyles';
import SidebarButtonTextStyles from 'sidebar/styles/SidebarButtonTextStyles';

export const AboutButton = (props) => {
  return (
    <Link to="/">
      <SidebarButtonStyles sidebarIsOpen={props.sidebarIsOpen}>
        <Icon name='home' size='2x' />
        <SidebarButtonTextStyles sidebarIsOpen={props.sidebarIsOpen}>About</SidebarButtonTextStyles>
      </SidebarButtonStyles>
    </Link>
  );
}

AboutButton.propTypes = {
  sidebarIsOpen: PropTypes.bool,
};

export default AboutButton;
