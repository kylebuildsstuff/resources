import React from 'react';

const Topic = (props) => {
  return (
    <div>
      Topic
      <h3>{props.params.topicId}</h3>
      {console.log('Topic: ', props)}
    </div>
  )
}

export default Topic;
