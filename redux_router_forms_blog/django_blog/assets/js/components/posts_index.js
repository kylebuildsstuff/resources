import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts()
  }

  render() {
    return (
      <div>
        List of blog postsasd
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     fetchPosts
//   }, dispatch);
// }
// ** Note: using a shortcut --> add an object instead of an action to action dispatchers
//          to avoid writing boilerplate mapDispatchToProps function

export default connect(null, { fetchPosts: fetchPosts })(PostsIndex);
