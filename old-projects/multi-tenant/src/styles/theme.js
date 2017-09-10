import constants from 'constants.js';

export const returnTheme = () => {
  // switch (process.env.REACT_APP_TENANT_NAME) {
  switch (constants.TENANT_NAME) {
    case 'smartcov':
      return {
        primaryColor: 'blue',
        secondaryColor: 'orange',
      };
    case 'drisi':
      return {
        primaryColor: 'red',
        secondaryColor: 'black',
        drisiSpecialColor: '#66ccff',
      };
    default:
      return {
        primaryColor: 'gray',
        secondaryColor: 'gray',
      };
  }
}

export default returnTheme;
