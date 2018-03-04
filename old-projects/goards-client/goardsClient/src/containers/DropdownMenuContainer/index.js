import React from 'react';
import PropTypes from 'prop-types';

import withDropdownOnClickHandlers from 'services/withDropdownOnClickHandlers';
import DropdownMenu from 'components/DropdownMenu';

export class DropdownMenuContainer extends React.Component {
  // Dropdowns are implemented by routes, location, and history logic
  // and act as flexible modals.
  goBack = (event) => {
    event.stopPropagation()
    if (this.props && this.props.history) {
      this.props.history.goBack()
    }
  }

  stopEventPropagation = (event) => {
    event.stopPropagation();
  }

  render() {
    if (this.props) {
      return (
        <DropdownMenu
          menuData={this.props.menuData}
          stopEventPropagation={this.stopEventPropagation}
          goBack={this.goBack}
        />
      );
    }
    return <div>Loading</div>
  }
}

DropdownMenuContainer.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  menuData: PropTypes.object,
};

export default withDropdownOnClickHandlers(DropdownMenuContainer);
