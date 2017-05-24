import React from 'react';

import AppRoutes from 'routes/AppRoutes';

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: true };
  }

  render() {
    return (
      <AppRoutes data={this.state.data} />
    );
  }
}

export default AppContainer;
