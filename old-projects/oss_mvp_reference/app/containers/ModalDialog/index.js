/**
*
* ModalDialog
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { activateModal, setFormInProgress } from '../App/actions';
import classnames from 'classnames';
import { forwardTo } from '../../utils/helpers';

import styles from './styles.css';

export class ModalDialog extends React.Component { // eslint-disable-line
  closeModal = () => {
    this.props.activateModal(false, '', '', '');
  }
  continueTransition = () => {
    this.props.setFormInProgress(false);
    forwardTo(this.props.ui.nextPath);
    this.props.activateModal(false, '', '', '');
  }
  render() {
    const classNames = classnames(styles.modalDialog, {
      [styles.modalActive]: this.props.ui.modalActive,
    });
    // console.log('modal: ', this.props.ui);
    return (
      <div className={classNames}>
        <h4>{this.props.ui.modalTitle}</h4>
        <p>{this.props.ui.modalBody}</p>
        <button className="btn-small" onClick={this.continueTransition}>
          yes
        </button>{' '}
        <button className="btn-small" onClick={this.closeModal}>
          no
        </button>
      </div>
    );
  }
}

ModalDialog.propTypes = {
  title: React.PropTypes.string,
  body: React.PropTypes.string,
  ui: React.PropTypes.object,
  modalActive: React.PropTypes.bool,
  activateModal: React.PropTypes.func,
  setFormInProgress: React.PropTypes.func,
  onModalToggle: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    activateModal: (bool, nextPath, str1, str2) => dispatch(activateModal(bool, nextPath, str1, str2)),
    setFormInProgress: (bool) => dispatch(setFormInProgress(bool)),
  };
}

export default connect(null, mapDispatchToProps)(ModalDialog);
