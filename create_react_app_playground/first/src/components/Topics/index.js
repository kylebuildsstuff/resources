import React from 'react';
import { Link, Match, Miss } from 'react-router';

import Topic from '../Topic/index';
import NoMatch from '../NoMatch/index';

const Topics = (props) => {
  return (
    <div>
      <h1>Topics</h1>
      {console.log('Topics: ', props)}
      <ul>
        <li><Link to={`${props.pathname}/rendering`}>Rendering with React</Link></li>
        <li><Link to={`${props.pathname}/components`}>Components</Link></li>
        <li><Link to={`${props.pathname}/props-v-state`}>Props vs. State</Link></li>
      </ul>

      <Match exactly pattern={`${props.pathname}`} component={() => (
        <h3>Please pick a topic.</h3>
      )} />
      <Match exactly pattern={`${props.pathname}/:topicId`} component={Topic} />

      <Miss component={NoMatch} />
    </div>
  )
}

export default Topics;
