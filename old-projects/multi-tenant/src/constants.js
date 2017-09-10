export const constants = ((environment = 'local') => {
  // let ROOT_URL;
  // switch (environment) {
  //   case 'local':
  //     ROOT_URL = 'http://localhost:8000';
  //     break;
  //   default:
  //     ROOT_URL = 'http://localhost:8000';
  // }

  return {
    // App-wide
    TENANT_NAME: 'smartcov',
  };
})();

export default constants;
