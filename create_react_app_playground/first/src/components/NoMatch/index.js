import React from 'react';

const NoMatch = ({ location }) => {
  return (
    <div>
      <h1>URL didn't match anything</h1>
      <h2>{location.pathname} didn't match any pages</h2>
    </div>  
  )
}

export default NoMatch;
