import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, OutlinedInput } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
// 3:26:00

import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
const CLIENT_ID = "209006956243-hnrvr7qtgbkrk9k54esgbs0f9nu72plm.apps.googleusercontent.com";

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: googleSuccess
        });

        google.accounts.id.renderButton(
            document.getElementById("google-sign-in"),
            { theme: "outline", size: "large", text: "Sign in with Google", width: "100px" }
        );
    }, [])

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const switchMode = () => {
        setIsSignup(!isSignup);
        handleShowPassword(false);
    }

    const googleSuccess = (res) => {
        console.log(res.credential);
        const userObject = jwt_decode(res.credential);
        console.log(userObject);
        // const result = res?.profileObj;
        // const token = res?.tokenId;

        // try {

        // } catch (error) {
        //     console.log(error)
        // }
    };

    const googleFailure = async (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try Again Later");
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup &&
                            (
                                <>
                                    <Input name="First Name" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="First Name" label="First Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/> 
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/> 
                        {
                            isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? "Sign Up" : "Sign In" }
                    </Button>
                    <div id="google-sign-in" className={classes.googleButton}></div>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;