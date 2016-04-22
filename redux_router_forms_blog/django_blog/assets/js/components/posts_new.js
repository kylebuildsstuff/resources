import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
// reduxForm is nearly identical to connect() in react-router

import {createPost} from '../actions/index';

class PostsNew extends Component {
  render() {
    const {fields: {title, categories, content}, handleSubmit} = this.props;
    // destructuring:
    // ie. const handleSubmit = this.props.handleSubmit;
    // ie. const title = this.props.fields.title
    // ie. const categories = this.props.fields.categories

    return (
      <form onSubmit={handleSubmit(this.props.createPost)}>
        <h3>Create a New Post</h3>

        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
        </div>

        <div className="form-group">
          <label>Categories</label>
          <input type="text" className="form-control" {...categories}/>
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea type="text" className="form-control" {...content}/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'PostsNewForm',  // value doesn't have to match component's name (just has to be unique)
  fields: ['title', 'categories', 'content'],
}, null, {createPost})(PostsNew);