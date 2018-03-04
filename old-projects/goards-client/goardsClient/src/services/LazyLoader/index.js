import React from 'react';

export class LazyLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AsyncModule: null,
    };
  }

  componentDidMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getComponent !== this.props.getComponent) {
      if (this.refs.isMounted) { // to avoid invoking setState on an unmounted component
        this.load(nextProps)
      }
    }
  }

  load = (props) => {
    // Need a middleman or else React and React-Router
    // will not discern between LazyLoader components
    // and will load the same LazyLoader component and just pass new props
    // instead of loading a new LazyLoader component with the new AsyncComponent
    this.setState({ AsyncModule: null }, this.getComponent(props));
  }

  getComponent = (props) => {
    return (
      () => {
        props.getComponent()  // getComponent={() => import('./someFile.js')}
          .then(module => module.default)
          .then(AsyncModule => this.setState({ AsyncModule }))
      }
    );
  }

  render() {
    const { loader, ...childProps } = this.props; // Object spread, same concept as Array spreads/rest parameters
    // childProps is an arbitrary name for the rest of the parameters
    const { AsyncModule } = this.state;

    if (AsyncModule) {
      return (
        <div ref="isMounted">
          <AsyncModule {...childProps} />
        </div>
      )
    }

    if (loader) {
      const Loader = loader;
      return <Loader />;
    }

    return null;
  }
}

export default LazyLoader;
