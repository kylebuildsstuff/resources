import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
// reduxForm is nearly identical to connect() in react-router
import {Link} from 'react-router';

import {createPost} from '../actions/index';

class PostsNew extends Component {
  // react router is availible to all components through context property.
  // to get access to react router, we define contextType. contextType operates
  // like props but reverse. It searches 'router' in app's context by parsing
  // through this component's parent components.
  // Think of it like this: if props is passing data downwards like a waterfall,
  // context is like a salmon going up the waterfall to retrieve food - food being
  // the data, 'router', or whatever is inside the contextTypes object.
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) { // props from the form .... title, categories...
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate the user to index
        this.context.router.push('/');
      });
  }

  render() {
    const {fields: {title, categories, content}, handleSubmit} = this.props;
    // destructuring:
    // ie. const handleSubmit = this.props.handleSubmit;
    // ie. const title = this.props.fields.title
    // ie. const categories = this.props.fields.categories

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New Post</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories}/>
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content}/>
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// validate gets called with the 'values' from the form
function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username';
  };
  if (!values.categories) {
    errors.categories = 'Enter a category';
  };
  if (!values.content) {
    errors.content = 'Enter content';
  };

  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',  // value doesn't have to match component's name (just has to be unique)
  fields: ['title', 'categories', 'content'],
  validate
}, null, {createPost})(PostsNew);