import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contactSelector, policiesSelector, autoPoliciesSelector } from './selectors';
import Form from './Form';

class Contact extends Component {
  render() {
    return (
      <div>
        <Form
          contact={this.props.contact}
          policies={this.props.policies}
          autoPolicies={this.props.autoPolicies}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contact: contactSelector(state),
    policies: policiesSelector(state),
    autoPolicies: autoPoliciesSelector(state),
  }
}

export default connect(mapStateToProps, null)(Contact);
