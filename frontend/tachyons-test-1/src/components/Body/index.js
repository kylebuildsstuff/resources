import React from 'react';
import classNames from 'classnames';

export const Body = () => {
  let styles = classNames('f2', 'br-pill', 'ba', 'b--dotted');
  return <div className={styles}>Body</div>;
};

export default Body;
