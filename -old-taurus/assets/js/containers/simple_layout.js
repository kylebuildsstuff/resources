import React, {Component} from 'react';
import {Link} from 'react-router';


const SimpleLayout = (props) => {
  return (
    <div className="main-layout">
      <main>
        {props.children}
      </main>
      <hr />
      <footer>
        <small>Copyright 2016</small>
      </footer>
    </div>
  );
}

export default SimpleLayout;
