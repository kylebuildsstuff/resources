import React from 'react';

import './Policy.css';

const Policy = (props) => {
  return (
    <div className="Policy">
      {props.policy.policy_number}
    </div>
  );
}

export default Policy;
