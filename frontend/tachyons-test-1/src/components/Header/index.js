import React from 'react';
import classNames from 'classnames';

export const Header = () => {
  let classes = classNames('f3', 'ba', 'b--red', 'helvetica');
  let classes2 = classNames('ba', 'b--blue', 'times', 'i', 'fw9', 'pl4');
  return (
    <div className={classes}>
      Header

      <div className={classes2}>
        whatwhat
        <div>
          whaaat
        </div>
      </div>

      <div>
        But whattt
      </div>
    </div>
  );
}

export default Header;
