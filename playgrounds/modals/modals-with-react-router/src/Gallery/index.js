import React from 'react';
import {
  Link,
} from 'react-router-dom';

import IMAGES from '../images';
import Thumbnail from '../Thumbnail';

export const Gallery = () => {
  return (
    <div>
      {IMAGES.map((i) => {
        return (
          <Link
            key={i.id}
            to={{
              pathname: `/img/${i.id}`,
              state: { modal: true } // This is the trick!
            }}
          >
            <Thumbnail color={i.color} />
            <p>{i.title}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default Gallery;
