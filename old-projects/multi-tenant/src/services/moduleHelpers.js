export const loadDefaultModule = (moduleName) => {
  switch (moduleName) {
    case 'HomePage':
      return import(`pages/default/HomePage`);
    default:
      return import('pages/default/ErrorPage');
  }
}

export const loadTenantModule = (tenantName, moduleName) => {
  console.log(tenantName)
  switch (tenantName) {
    case 'smartcov':
      switch (moduleName) {
        case 'HomePage':
          return import(`pages/tenants/smartcov/HomePage`);
        default:
          return loadDefaultModule(moduleName);
      }
    case 'drisi':
      switch (moduleName) {
        case 'HomePage':
          return import(`pages/tenants/drisi/HomePage`);
        default:
          return loadDefaultModule(moduleName);
      }
    default:
      return loadDefaultModule(moduleName);
  }
}
