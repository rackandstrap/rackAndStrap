import React, {useState} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMutation } from "@tanstack/react-query";

import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../slice/authUserSlice";
import { setToken } from "../../slice/tokenSlice";
import {login, logout} from "../../slice/loginSlice.js";
import Home from '../../pages/Home/index.js';


const defaultTheme = createTheme();

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const[newUser, setNewUser] = useState({
        username: '',
        password: '',
        confirmpassword: '',
        name:'',
        homebase: '',
    });

    const [errors, setErrors] = useState({})

    // const validateForm = (form) => {
    //     let errors = {}

    //     if (form.name.trim().length < 2) {
    //         errors.name = "Name is too short"
    //     }

    //     if (form.userName.trim().length < 2) {
    //         errors.userName = "Username is too short"
    //     }

    //     if (form.password.length < 6) {
    //         errors.password = "Password is too short"
    //     }

    //     if (form.password !== form.confirmPassword) {
    //         errors.confirmPassword = "Passwords do not match"
    //     }

    //     return errors
    // }

    const handleChange = (event) => {
        const {name, value} = event.target
        setNewUser({
            ...newUser,
            [name]: value
        })
    }

    const attemptSignUp = useMutation({

        mutationFn: async () => {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:3001/users/register',
                data: {
                    'username': newUser.username, 
                    'password': newUser.password
                }
            })
            return response.data
        },

        onSuccess: (returnedData) => {
            console.log(returnedData)
            dispatch(auth(returnedData.user));
            dispatch(setToken(returnedData.token));
            localStorage.setItem('token', returnedData.token)
            localStorage.setItem('user', returnedData.user._id)
            dispatch(login())
            navigate('/home');
        },

        onError: (error) => {
            console.error("Cannot create new user", error);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // if (newUser.password !== newUser.confirmpassword) {
        //     setPasswordsDoNotMatch(true)
        // } else {
        //     attemptSignUp.mutate()
        // }
        attemptSignUp.mutate()
    }

    const handleNewUser=(event)=>{
        // console.log(event.target.name, event.target.value);
        setNewUser({...newUser,[event.target.name]: event.target.value});
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        onChange={handleChange}
                    />
                    {errors.password && <span class="error">{errors.password}</span>}
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        autoComplete="username"
                        name="username"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoFocus
                        onChange={handleChange}
                        // {...(errors.name) ? error: null}
                    />
                    {errors.name && <span class="error">{errors.name}</span>}
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        type="password"
                        onChange={handleChange}
                    />
                    {errors.userName && <span class="error">{errors.userName}</span>}
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm-Password"
                        type="password"
                        id="confirm-password"
                        autoComplete="confirm-password"
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <span class="error">{errors.confirmPassword}</span>}
                    
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="center">
                    <Grid item>
                    <Link href="/login" variant="body2" id="signInLink">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
        </ThemeProvider>
    );
}

export default SignUp;