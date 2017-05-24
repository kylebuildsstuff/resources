export const loadTenantModule = (tenantName, moduleName) => {
  switch (tenantName) {
    case 'smartcov':
      console.warn(tenantName, moduleName)
      return import(`pages/tenants/smartcov/HomePage`)
      // return import(`pages/tenants/smartcov/${moduleName}`)
    default:
      return import('pages/default/ErrorPage');
  }
}

// export const loadModule = (name) => {
//   console.log('name: ', name)
//   require.ensure([], require => {
//     const module = require(name);
//     console.warn(module);
//   })
// }

// export class TenantLoad extends React.Component {
//
// }

// export const asyncImportFromPath = (modulePath) => {
//   console.warn('what: ', modulePath)
//   return (
//     () => import('../' + modulePath)
//   );
// }
