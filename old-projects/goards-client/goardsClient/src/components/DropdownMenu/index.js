import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DropdownMenuStyles from './styles/DropdownMenuStyles';
import DropdownMenuItemStyles from './styles/DropdownMenuItemStyles';
import BackgroundDropdownMenuStyles from './styles/BackgroundDropdownMenuStyles';

export class DropdownMenu extends React.Component {
  render() {
    const { menuData } = this.props;
    if (menuData) {
      return (
        <BackgroundDropdownMenuStyles onClick={this.props.goBack}>
          <DropdownMenuStyles onClick={this.props.stopEventPropagation}>
            {menuData.map((value, index) => {
              if (value.handleClick) {
                return (
                  <DropdownMenuItemStyles key={value.order}>
                    <Link
                      to={value.toPath}
                      onClick={value.handleClick}
                    >
                      {value.plainText}
                    </Link>
                  </DropdownMenuItemStyles>
                );
              }
              return (
                <DropdownMenuItemStyles key={value.order}>
                  <Link to={value.toPath}>{value.plainText}</Link>
                </DropdownMenuItemStyles>
              );
            })}
          </DropdownMenuStyles>
        </BackgroundDropdownMenuStyles>
      );
    }
    return <div></div>
  }
}

DropdownMenu.propTypes = {
  menuData: PropTypes.array,
  goBack: PropTypes.func,
  stopEventPropagation: PropTypes.func,
};

export default DropdownMenu;
