import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/index';

const initialState = {
    posts: [],
    status: 'idle'
}

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    try {
        const { data } = await api.fetchPosts();
        console.log("getPosts data: ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
    try {
        const { data } = await api.createPostApi(post);
        console.log("createPost data: ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, post }) => {
    try {
        const { data } = await api.updatePostApi(id, post);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    try {
        await api.deletePostApi(id);
        return id;
    } catch (error) {
        console.log(error);
    }
});

export const likePost = createAsyncThunk('posts/likePost', async (id) => {
    try {
        const { data } = await api.likePostApi(id);
        return data;
    } catch (error) {
        console.log(error);
    }
});

// remove export, used to understand what createSlice returns
export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: { // for each reducer, an action creator is
                // made automatically with the prefix "posts".
                // this is why we deconstruct postsSlice.actions
                // at the end of this file
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
            .addCase(createPost.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts = [...state.posts, action.payload];
                state.status = 'idle';
                console.log(state.posts);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(updatePost.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
                state.status = 'idle';
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(deletePost.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post._id !== action.payload);
                state.status = 'idle';
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(likePost.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(likePost.fulfilled, (state, action) => {
                console.log("likePost fulfilled, payload: ", action.payload);
                state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
                state.status = 'idle';
            })
            .addCase(likePost.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
});

//export const {  } = postsSlice.actions;

export default postsSlice.reducer;