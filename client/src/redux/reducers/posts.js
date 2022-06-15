import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/index';

const initialState = {
    posts: [],
    isLoading: false,
}

export const getPost = createAsyncThunk('posts/getPost', async (id) => {
    try {
        const { data } = await api.fetchPost(id);
        console.log("getPost data: ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const getPosts = createAsyncThunk('posts/getPosts', async (page) => {
    try {
        const data = await api.fetchPosts(page);
        console.log("getPosts data: ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const getPostsBySearch = createAsyncThunk('posts/getPostsBySearch', async (searchQuery) => {
    try {
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery); 
        console.log("getPostsBySearch data: ", data);
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

export const commentPost = createAsyncThunk('posts/commentPost', async ({ value, id }) => {
    try {
        const { data } = await api.comment(value, id);
        console.log(data); // { comments: ['comment'] }
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
            .addCase(getPost.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                console.log("getPost action.payload: ", action.payload);
                state.isLoading = false;
                state.post = action.payload;
            })
            .addCase(getPosts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                console.log("action.payload: ", action.payload);
                const { data, currentPage, numberOfPages } = action.payload.data;
                state.posts = data;
                state.currentPage = currentPage;
                state.numberOfPages = numberOfPages;
                state.isLoading = false;
            })
            .addCase(createPost.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts = [...state.posts, action.payload];
                state.isLoading = false;
            })
            .addCase(updatePost.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
                state.isLoading = false;
            })
            .addCase(deletePost.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post._id !== action.payload);
                state.isLoading = false;
            })
            .addCase(likePost.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
                state.posts = posts;
                state.isLoading = false;
            })
            .addCase(getPostsBySearch.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getPostsBySearch.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.isLoading = false;
            })
            .addCase(commentPost.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(commentPost.fulfilled, (state, action) => {
                const posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
                state.posts = posts;
                state.isLoading = false;
            })
    }
});

//export const {  } = postsSlice.actions;

export default postsSlice.reducer;