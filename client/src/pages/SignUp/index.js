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

    const API_BASE_URL = process.env.REACT_APP_BASE_URL;

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

    const validateForm = (form) => {
        let errors = {}

        if (form.name.trim().length < 2) {
            errors.name = "Name is too short"
        }

        if (form.username.trim().length < 2) {
            errors.username = "Username is too short"
        }

        if (form.password.length < 6) {
            errors.password = "Password is too short"
        }

        if (form.password !== form.confirmPassword) {
            errors.confirmPassword = "Passwords do not match"
        }

        return errors
    }

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
                url: API_BASE_URL + 'users/register',
                data: {
                    'username': newUser.username, 
                    'password': newUser.password,
                    'name': newUser.name
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
            console.error("Cannot create new user", error.response);
            
            //Set error
            if(error.response.data.message === 'User already exists'){
                console.log("this should work here!")
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    username: 'Username already exists',
                  }));
            }
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newUser)
        const errors = validateForm(newUser)
        if (Object.keys(errors).length > 0) {
            setErrors(errors)
        } else {
            attemptSignUp.mutate()
        }
        
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
                    {errors.name && <span className="error">{errors.name}</span>}
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
                    />
                    {errors.username && <span className="error">{errors.username}</span>}
                    
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
                    {errors.password && <span className="error">{errors.password}</span>}
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
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
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