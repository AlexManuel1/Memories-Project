import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/index';
// api.fetchPosts()

const initialState = {
    posts: [],
    status: 'idle'
}

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    try {
        const { data } = await api.fetchPosts();
        return data;
    } catch (error) {
        console.log(error);
    }
}) 

// remove export, used to understand what createSlice returns
export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: { // for each reducer, an action creator is
                // made automatically with the prefix "posts".
                // this is why we deconstruct postsSlice.actions
                // at the end of this file
        createPost: (state, action) => {
            //fill later
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.status = 'idle';
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})

export const { createPost } = postsSlice.actions;

export default postsSlice.reducer;