import react, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
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

import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../slice/authUserSlice";
import { setToken } from "../../slice/tokenSlice";
import {login, logout} from "../../slice/loginSlice.js";
import Home from '../../pages/Home/index.js';


const defaultTheme = createTheme();

const SignIn = () => {
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch()

    const login_status = useSelector(state =>state.loginStateValue.value);
    // console.log(login_status);

    const[username, setUserName] = useState('');
    const[password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const[loggedInStatus, setLoggedInStatus] = useState(false);
    

    const attemptLogin = useMutation({

        mutationFn: async () => {
            let response = await axios({
                method: 'POST',
                url: 'http://localhost:3001/users/login',
                data: {
                    'username': username,
                    'password': password
                }
            })
            return response.data
        },

        onSuccess: (returnedData) => {
            dispatch(auth(returnedData.user))
            dispatch(setToken(returnedData.token))
            localStorage.setItem('token', returnedData.token)
            localStorage.setItem('user', returnedData.user._id)
            dispatch(login())
            navigate('/home');
        },

        onError: (error) => {
            console.error(error);
            setLoginError(true)
        }
        
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        attemptLogin.mutate()
    };

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoComplete="Username"
              autoFocus
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginError > 0 && <p>Invalid credentials</p>}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link id='signUpLink' href='/signUp' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <p id="copyright" style={{ marginTop: "5em" }}>
            Copyright @ RackandStrap 2023
        </p>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn