import React from 'react';

export const Image = ({ color }) => {
  return (
    <div
      style={{
        width: '100%',
        height: 400,
        background: color
      }}
    ></div>
  );
}

export default Image;
