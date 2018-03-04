import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Sidebar from 'sidebar/Sidebar';
import HamburgerButton from 'sidebar/HamburgerButton';
import AboutButton from 'sidebar/AboutButton';
import ProfileButtonContainer from 'containers/ProfileButtonContainer';

export class SidebarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarIsOpen: false,
      sidebarElements: [],
    };
  }

  componentDidMount() {
    if (this.props.authenticated) {
      this.setState({
        sidebarElements: this.state.sidebarElements.concat(HamburgerButton, ProfileButtonContainer, AboutButton),
      });
    } else {
      this.setState({
        sidebarElements: this.state.sidebarElements.concat(HamburgerButton, ProfileButtonContainer, AboutButton),
      });
    }
  }

  toggleSidebarIsOpenState = () => {
    this.setState({ sidebarIsOpen: !this.state.sidebarIsOpen });
  }

  render() {
    const { sidebarIsOpen, sidebarElements} = this.state;
    const { logout, authenticated } = this.props;
    return (
      <div>
        <Sidebar
          authenticated={authenticated}
          sidebarIsOpen={sidebarIsOpen}
          sidebarElements={_.isEmpty(sidebarElements) ? undefined: sidebarElements}
          toggleSidebarIsOpenState={this.toggleSidebarIsOpenState}
          logout={logout}
        />
      </div>
    );
  }
}

SidebarContainer.propTypes = {
  authenticated: PropTypes.bool,
  logout: PropTypes.func,
};

export default SidebarContainer;
