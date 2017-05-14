import React from 'react';

import Button from '../globalStyles/Button';

type Props = {
  createGoal: () => mixed,
};

export const UtilityTopBar = (props: Props) => {
  function createGoal() {
    props.createGoal(localStorage.getItem('jwt'))
  }

  return (
    <div>
      <Button
        onClick={createGoal}
      >
        Create
      </Button>
    </div>
  );
};

export default UtilityTopBar;
