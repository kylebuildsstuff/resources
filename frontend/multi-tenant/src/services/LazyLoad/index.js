import React from 'react';

// import { asyncImportFromPath } from 'services/modules';
// import { loadModule } from 'services/moduleHelpers';
import { loadTenantModule } from 'services/moduleHelpers';

export class LazyLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AsyncModule: null,
    };
  }

  componentDidMount() {
    // this.props.getComponent()  // getComponent={() => import('./someFile.js')}
    // import(this.props.absoluteModulePath)
    // import(`bundle-loader?lazy!${this.props.absoluteModulePath}`)  // Critical dependency: the request of a dependency is an expression
    loadTenantModule(this.props.tenantName, this.props.moduleName)
      .then(module => module.default)
      .then(AsyncModule => this.setState({AsyncModule}))
  }

  render() {
    const { loader, ...childProps } = this.props;
    const { AsyncModule } = this.state;

    if (AsyncModule) {
      return <AsyncModule {...this.props} {...childProps} />;
    }

    if (loader) {
      const Loader = loader;
      return <Loader />;
    }

    return null;
  }
}

export default LazyLoad;
