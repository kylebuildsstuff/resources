import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {deleteGoal} from '../actions/index';
import ModalContainer from './modal_container';
import GoalEditModal from './goal_edit_modal';


class GoalListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false,
    };

    this.changeEditMode = this.changeEditMode.bind(this);
  }

  deleteGoal(goal, e) {
    e.preventDefault();
    this.props.deleteGoal(goal, localStorage.jwt);
  }

  changeEditMode() {
    this.setState({
      isEditMode: !this.state.isEditMode,
    })
  }

  render() {
    const {goal} = this.props;
    return (
      <div className="btn btn-primary" onClick={this.changeEditMode}>
        <div>{goal.title}</div>
        <div>{goal.created}</div>
        <div>{goal.due_date}</div>
        <div>{goal.notes}</div>
        <div
          className="btn btn-danger"
          onClick={this.deleteGoal.bind(this, goal)}>
          Delete
        </div>

        <ModalContainer isEditMode={this.state.isEditMode}>
          <div className="react-modal-container--inner">
            <GoalEditModal
              changeEditMode={this.changeEditMode}
              goal={goal}>
            </GoalEditModal>
          </div>
        </ModalContainer>
      </div>
    );
  }
}

export default connect(null, {deleteGoal})(GoalListItem);
