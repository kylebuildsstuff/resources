import { combineReducers } from 'redux';

import PostsReducer from './reducers_posts';


const rootReducer = combineReducers({
  posts: PostsReducer,
});

export default rootReducer;