import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import { bindActionCreators } from 'redux';

import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts()
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
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
