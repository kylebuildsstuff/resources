import React, {Component} from 'react';

import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './search_bar.js';
import VideoList from './video_list.js';
import VideoDetail from './video_detail.js';

import '../../styles/styles.scss';


const API_KEY = 'AIzaSyAJfcbzxLo8QFcYX4T2gFxFvu02mCipiqs'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('nature');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0],
      });
    });
  }

  render() {
    const videoSearch = _.debounce(term => {this.videoSearch(term)}, 500);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }

}
