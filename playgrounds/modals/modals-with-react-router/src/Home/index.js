import React from 'react';

import {
  Link,
} from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <Link to='/gallery'>Visit the Gallery</Link>
      <h2>Featured Images</h2>
      <ul>
        <li><Link to='/img/2'>Tomato</Link></li>
        <li><Link to='/img/4'>Crimson</Link></li>
      </ul>
    </div>
  );
}

export default Home;
