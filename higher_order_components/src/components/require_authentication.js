import React, {Component} from 'react';
import {connect} from 'react-redux';


export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      };
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.authenticated
    };
  }

  return connect(mapStateToProps)(Authentication);
}








// In some other location... Not in this file...
// We want to use this HOC (Higher Order Function)
// import Authentication // This is my HOC
// import Resources // This is the component I want to wrap
//
// const ComposedComponent = Authentication(Resources);
//
// // In some render method...
// <ComposedComponent resources={resourceList}/>
