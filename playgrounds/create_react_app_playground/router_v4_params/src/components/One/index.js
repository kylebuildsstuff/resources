import React from 'react';
import { Miss, Link, Match } from 'react-router';

import NoMatch from '../NoMatch/index';

const One = (props) => {
  return (
    <div>
      I am the One.
      <Link to={`${props.pathname}/pOne`}></Link>
      <Link to={`${props.pathname}/pTwo/pTwoTwo`}></Link>

      <hr />

      <Match pattern={`${props.pathname}/:pOne`} component={pOne} />
      <Match pattern={`${props.pathname}/:pTwo/:pTwoTwo`} component={} />

      <Miss component={NoMatch} />
    </div>
  );
}

export default One;
