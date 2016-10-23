import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import '../../styles/sparrow/scss/landing.scss';


class Landing extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    if (localStorage.jwt) {
      this.context.router.push('/home');
    }
  }

  render() {
    return (
      <div className="landing-container">
        <h2>Taurus Landing Page</h2>
        <div className="btn-group">
          <Link to="login" className="btn btn-primary">Login</Link>
          <Link to="register" className="btn btn-warning">Register</Link>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Landing);
