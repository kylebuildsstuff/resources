import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import _ from 'lodash';

import {editGoal} from '../actions/index';


const FIELDS = {
  title: {
    type: 'input',
    inputType: 'text',
    label: 'Title',
  },
  notes: {
    type: 'textarea',
    inputType: 'text',
    label: 'Notes',
  },
}

class GoalEditModal extends Component {
  onSubmit(props) {
    this.props.editGoal(props, this.props.goal, localStorage.jwt)
    this.props.changeEditMode();
    this.props.resetForm()
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];
    const {goal} = this.props;

    return (
      <div key={field} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' :''}`}>
        <label>{field}</label>
        <fieldConfig.type
          type={fieldConfig.inputType}
          className="form-control"
          placeholder={`${goal[field]}`}
          {...fieldHelper}/>
      </div>
    );
  }

  render() {
    const {goal, handleSubmit} = this.props;
    return (
      <div>
        <div>Howdy Yawll</div>

        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h2>Edit this Goal!</h2>

            {_.map(FIELDS, this.renderField.bind(this))}

          <div className="btn-group">
            <button type="submit" className="btn btn-success">Edit</button>
            <div className="btn btn-danger" onClick={this.props.changeEditMode}>
              Close
            </div>
          </div>
        </form>


      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  return errors;
}

export default reduxForm({
  form: 'GoalEditModalForm',
  fields: _.keys(FIELDS),
  validate,
}, null, {editGoal})(GoalEditModal);
