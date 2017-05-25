export const loadDefaultModule = (moduleName) => {
  switch (moduleName) {
    case 'HomePage':
      return import(`pages/default/HomePage`);
    default:
      return import('pages/default/ErrorPage');
  }
}

export const loadTenantModule = (tenantName, moduleName) => {
  switch (tenantName) {
    case 'smartcov':
      switch (moduleName) {
        case 'HomePage':
          return import(`pages/tenants/smartcov/HomePage`);
        default:
          return loadDefaultModule(moduleName);
      }
    default:
      return loadDefaultModule(moduleName);
  }
}

// export class TenantLoad extends React.Component {
//
// }

// export const asyncImportFromPath = (modulePath) => {
//   console.warn('what: ', modulePath)
//   return (
//     () => import('../' + modulePath)
//   );
// }
