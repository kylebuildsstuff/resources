import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {store} from '../index';
import {Provider} from 'react-redux';

import '../../styles/sparrow/scss/modal.scss';

// Modal will be rendered as nothing first
// Once mounted, a new div is created and attached directly to <body>
// The new div will contain the actual modal content

class ModalContainer extends Component {
  constructor(props) {
    super(props);
  }

  // whenever this modal gets rendered to screen
  // create a new div that will be a modal
  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = this.props.isEditMode ? 'react-modal-container' : 'hide'
    // attach the modal div directly to the DOM body
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  componentWillUpdate(nextProps, nextState) {
    this.modalTarget.className = nextProps.isEditMode ? 'react-modal-container' : 'hide'
    // whenever we get new children, render again
    this._render();
  }

  componentWillUnmount() {
    // clean up
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render() {
    // render any child (content) of this modal to the newly created div
    ReactDOM.render(
      <Provider store={store}>
        <div>{this.props.children}</div>
      </Provider>
      , this.modalTarget
    );
  }

  render() {
    // noscript means render nothing... at first
    return <noscript />;
  }
}

export default ModalContainer;
