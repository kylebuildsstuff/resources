import React, {Component} from 'react';

import GlobalNav from './global_nav';
import LocalNav from './local_nav';
import ContentArea from './content_area';


export default class MainPage extends Component {
  render() {
    return (
      <div>
        <h1>This is the main page componesnt</h1>
        <GlobalNav />
        <div className='post-global-nav'>
          <LocalNav />
          <ContentArea />
        </div>

      </div>
    )
  }
}
