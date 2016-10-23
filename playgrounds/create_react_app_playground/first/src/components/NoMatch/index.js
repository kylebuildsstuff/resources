import React from 'react';

const NoMatch = (props) => {
  return (
    <div>
      <h1>URL didn't match anything</h1>
      <h2>{props.location.pathname} didn't match any pages</h2>
      {console.log('NoMatch: ', props)}
    </div>
  )
}

export default NoMatch;
