import React from 'react';

export const Thumbnail = ({ color }) => {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        background: color
      }}
    />
  );
}

export default Thumbnail;
