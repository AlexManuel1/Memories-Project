import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/index';

const initialState = {
    authData: null
};

export const signin = createAsyncThunk("auth/signin", async ({ formData, history }) => {
    try {
        // log in user
        const { data } = await api.signIn(formData);
        if (Object.keys(data).length !== 0) {
            localStorage.setItem('profile', JSON.stringify(data));
            history.push('/');
        }
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const signup = createAsyncThunk("auth/signup", async ({ formData, history }) => {
    try {
        // sign up in user
        const { data } = await api.signUp(formData);
        if (Object.keys(data).length !== 0) {
            localStorage.setItem('profile', JSON.stringify(data));
            history.push('/');
        }
        return data;
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
            if (Object.keys(loginData).length !== 0) {
                localStorage.setItem('profile', JSON.stringify({ ...loginData}));
            }
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
                console.log("pending");
            })
            .addCase(signin.fulfilled, (state, action) => {
                return { ...state, authData: action.payload };
            })
            .addCase(signin.rejected, (state, action) => {
                console.log("rejected");
            })
            .addCase(signup.pending, (state, action) => {
                console.log("pending");
            })
            .addCase(signup.fulfilled, (state, action) => {
                return { ...state, authData: action.payload };
            })
            .addCase(signup.rejected, (state, action) => {
                console.log("rejected");
            })
    }
});

export const { authorize, logout } = authSlice.actions;

export default authSlice.reducer;
