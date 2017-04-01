import React from 'react';
// import { Motion, spring } from 'react-motion';

import './Modal.css';

class Modal extends React.Component {
  render() {
		return (
      <div className="Modal">
        <div className="Inner">
          <h5>{this.props.title}</h5>
          <p>{this.props.body}</p>
        </div>
      </div>
		);
	}
}

export default Modal;
