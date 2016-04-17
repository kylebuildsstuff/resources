import React, {Component} from 'react';

import YTSearch from 'youtube-api-search'

import SearchBar from './search_bar.js';
import VideoList from './video_list.js';
import VideoDetail from './video_detail.js';


const API_KEY = 'AIzaSyAJfcbzxLo8QFcYX4T2gFxFvu02mCipiqs'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {videos: []};

    YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
      this.setState({videos});
    });
  }

  render() {
    return (
      <div>
        <SearchBar />
        <VideoDetail video={this.state.videos[0]} />
        <VideoList videos={this.state.videos} />
      </div>
    );
  }

}
