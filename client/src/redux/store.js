import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/posts';
import authReducer from './reducers/auth';

export default configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer
    }
});