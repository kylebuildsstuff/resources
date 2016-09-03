import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';

import {createUser, fetchJWT} from '../actions/index';

// Form fields for registration
const FIELDS = {
  username: {
    type: 'input',
    inputType: 'text',
    label: 'Username',
  },
  password: {
    type: 'input',
    inputType: 'password',
    label: 'Password',
  },
}

class UserRegister extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  // When submitting form, create a user, fetch a jwt
  // with the credentials, and set jwt in localStorage
  onSubmit(props) {
    this.props.createUser(props)
      .then(res => {
        if (!res.error) {
          return this.props.fetchJWT(props)
        } else {
          throw 'Username already taken'
        }
      })
      .then(res => {
        localStorage.clear();
        localStorage.jwt = res.payload.data.token;
        localStorage.decodedJwt = JSON.stringify(jwt_decode(localStorage.jwt))
        this.context.router.push('/home');
      })
      .catch(err => {
        console.log(err)
      })
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div key={field} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type={fieldConfig.inputType} className="form-control" {...fieldHelper}/>
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    )
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div className="user-register-container">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h2>Register</h2>

            {_.map(FIELDS, this.renderField.bind(this))}

          <div className="btn-group">
            <button type="submit" className="btn btn-warning">Register</button>
            <Link to="/" className="btn btn-danger">Back</Link>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  })

  return errors;
}

export default reduxForm({
  form: 'UserRegisterForm',
  fields: _.keys(FIELDS),
  validate,
}, null, {createUser, fetchJWT})(UserRegister)
