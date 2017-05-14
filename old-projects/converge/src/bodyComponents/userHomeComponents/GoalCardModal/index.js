// @flow
import React from 'react';

import GoalCardModalBackgroundStyles from './styles/GoalCardModalBackgroundStyles';
import GoalCardModalStyles from './styles/GoalCardModalStyles';
import BackButtonStyles from './styles/BackButtonStyles';
import RedButton from '../../../globalStyles/RedButton';

import GoalCardModalTitleForm from '../GoalCardModalTitleForm';
import GoalCardModalDescriptionForm from '../GoalCardModalDescriptionForm';

type Props = {
  goBack: () => mixed,
  goal: {
    id: number,
    title: ?string,
    description: ?string,
  },
  submitGoalEdit: () => mixed,
  stopEventPropagation: () => mixed,
  toggleLocalState: () => mixed,
  deleteGoal: () => mixed,
}

export class GoalCardModal extends React.Component {
  props: Props;
  render() {
    return (
      <GoalCardModalBackgroundStyles onClick={this.props.goBack}>
        <GoalCardModalStyles onClick={this.props.stopEventPropagation}>

          <p>{`Goal id: ${this.props.goal.id}`}</p>

          {this.props.editingTitle ? (
            <GoalCardModalTitleForm submitGoalEdit={this.props.submitGoalEdit} />
          ) : (
            <h4 onClick={this.props.toggleLocalState('editingTitle')}>{this.props.goal.title}</h4>
          )}
          {this.props.editingDescription ? (
            <GoalCardModalDescriptionForm submitGoalEdit={this.props.submitGoalEdit} />
          ) : (
            <h4 onClick={this.props.toggleLocalState('editingDescription')}>{this.props.goal.description}</h4>
          )}

          <BackButtonStyles onClick={this.props.goBack}><i className="fa fa-times" /></BackButtonStyles>
          <RedButton onClick={this.props.deleteGoal}><i className="fa fa-trash" /></RedButton>

        </GoalCardModalStyles>
      </GoalCardModalBackgroundStyles>
    );
  }
}

export default GoalCardModal;
