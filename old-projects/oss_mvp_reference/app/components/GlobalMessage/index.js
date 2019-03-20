/*
 *
 * GlobalMessage
 *
 */

import React from 'react';
import classnames from 'classnames';

import styles from './styles.css';

function GlobalMessage(props) {
  const classNames = classnames(styles.globalMessage, {
    [styles.active]: props.global.globalMessage !== '',
  });
  return (
    <div className={classNames}>
      {props.global.globalMessage !== '' && <p>{props.global.globalMessage}</p>}
    </div>
  );
}

GlobalMessage.propTypes = {
  global: React.PropTypes.object,
};

export default GlobalMessage;
