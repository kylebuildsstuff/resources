// @flow
import React from 'react';

import GoalCardModal from '../GoalCardModal';

type Props = {
  deleteGoal: () => mixed,
  goBack: () => mixed,
  editGoal: () => mixed,
  goal: {
    id: number,
  },
  history: {
    goBack: () => mixed
  },

};

type LocalState = {
  editingTitle: boolean,
  editingDescription: boolean
};

export class GoalCardModalContainer extends React.Component {
  props: Props;
  state: LocalState;
  initialState: LocalState
  constructor(props: Props) {
    super(props);
    this.initialState = {
      editingTitle: false,
      editingDescription: false,
    };
    this.state = this.initialState;
  }

  deleteGoal = () => {
    this.props.deleteGoal(this.props.goal.id, localStorage.getItem('jwt'))
    this.props.history.goBack();
  }

  goBack = (event: Object) => {
    event.stopPropagation()
    this.props.history.goBack()
  }

  stopEventPropagation = (event: Object) => {
    event.stopPropagation();
  }

  submitGoalEdit = (formSubmitData: Object) => {
    this.props.editGoal(this.props.goal.id, formSubmitData, localStorage.getItem('jwt'));
    this.setState(this.initialState);
  }

  toggleLocalState = (field: ?string = undefined) => {
    if (field && Object.keys(this.state).includes(field)) {
      return (
        () => this.setState({
          [field]: !this.state[field]
        })
      );
    }
  }

  render() {
    return (
      <GoalCardModal
        editingTitle={this.state.editingTitle}
        editingDescription={this.state.editingDescription}
        deleteGoal={this.deleteGoal}
        goBack={this.goBack}
        stopEventPropagation={this.stopEventPropagation}
        submitGoalEdit={this.submitGoalEdit}
        toggleLocalState={this.toggleLocalState}
        goal={this.props.goal}
      />
    );
  }
}

export default GoalCardModalContainer;
