import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/index';

const initialState = {
    authData: null
};

export const signin = createAsyncThunk("auth/signin", async ({ formData, history }) => {
    try {
        // log in user

        history.push('/');
    } catch (error) {
        console.log(error);
    }
});

export const signup = createAsyncThunk("auth/signin", async ({ formData, history }) => {
    try {
        // sign up in user

        history.push('/');
    } catch (error) {
        console.log(error);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authorize(state, action) {
            const loginData = action.payload;
            localStorage.setItem('profile', JSON.stringify({ ...loginData}));
            //console.log("authorize reducer action: ", loginData);
            return { ...state, authData: loginData};
        },
        logout(state) {
            localStorage.clear();
            return { ...state, authData: null }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(signin.pending, (state, action) => {
                
            })
            .addCase(signin.fulfilled, (state, action) => {
                
            })
            .addCase(signin.rejected, (state, action) => {
                
            })
            .addCase(signup.pending, (state, action) => {
                
            })
            .addCase(signup.fulfilled, (state, action) => {
                
            })
            .addCase(signup.rejected, (state, action) => {
                
            })
    }
});

export const { authorize, logout } = authSlice.actions;

export default authSlice.reducer;
