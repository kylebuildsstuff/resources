import React from 'react';

import IMAGES from '../images';
import Image from '../Image'

export const ImageView = ({ match }) => {
  const image = IMAGES[parseInt(match.params.id, 10)];
  if (!image) {
    return (
      <div>Image not found</div>
    );
  }
  return (
    <div>
      <h1>{image.title}</h1>
      <Image color={image.color} />
    </div>
  );
}

export default ImageView;
