import React from 'react';

import constants from 'constants.js';
import AppRoutes from 'routes/AppRoutes';

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: false };
  }

  componentDidMount() {
    this.fetchFromApi(constants.TENANT_NAME)
  }

  fetchFromApi = (tenantName) => {
    const response = this.fakeAxios(`api.com/${tenantName}/phone_numbers`);
    this.setState({ data: response });
  }

  fakeAxios = () => {
    return {
      'base_number': '1-855-430-1889',
      'alpha_numeric_number': undefined,
      'alpha_numeric_affiliate_number': undefined,
      'step_1_number': '1-855-430-1889',
      'step_2_number': '1-855-430-1889',
      'step_3_number': '1-855-430-1889',
      'step_4_number': '1-855-430-1889',
      'step_5_number': '1-855-430-1889',
      'step_5_affiliate_number': '1-844-277-0400',
      'kickout_number': '1-855-430-1889',
      'kickout_alpha_numeric_number': undefined,
    };
  }

  render() {
    return (
      <AppRoutes data={this.state.data} />
    );
  }
}

export default AppContainer;
