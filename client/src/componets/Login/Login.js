import React from "react";
import { useState, useEffect } from "react";
import './Login.css';
import fbLogo from './Logo/f_logo_RGB-Blue_58.png';
import googleLogo from './Logo/Google__G__Logo.svg.png';
// import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../slice/authUserSlice";
import { setToken } from "../../slice/tokenSlice";
import {login, logout} from "../../slice/loginSlice.js";
import Home from '../../pages/Home/index.js';
import {useNavigate} from 'react-router-dom';
import { useMutation, useQuery } from "@tanstack/react-query";

const axios = require('axios')

const Login = () =>{

    /*
    We can just use userInfo from our store as we need.
    */
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch()

    const login_status = useSelector(state =>state.loginStateValue.value);
    // console.log(login_status);


    const[username, setUserName] = useState('');
    const[password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const[loggedInStatus, setLoggedInStatus] = useState(false);

    const[newUser, setNewUser] = useState({
        username: '',
        password: '',
        confirmpassword: '',
        name:'',
        homebase: '',
    });
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(null);
    
    const handleUserNameChange=(e)=>{
        setUserName(e.target.value);
    }

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }

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

    const makeSignUpRequest = (e) => {
        e.preventDefault()
        if (newUser.password !== newUser.confirmpassword) {
            setPasswordsDoNotMatch(true)
        } else {
            attemptSignUp.mutate()
        }
    }

    const handleNewUser=(event)=>{
        // console.log(event.target.name, event.target.value);
        setNewUser({...newUser,[event.target.name]: event.target.value});
    }

    // console.log("userInfo", loggedInStatus);

    if(login_status == false){
        // console.log(userInfo.username);
        return(
            <div className="Auth-window">
                <div  className="login-window"> Login
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        attemptLogin.mutate()
                    }}>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" value={username} onChange={handleUserNameChange} required/>
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" value={password} onChange={handlePasswordChange} required/>
                        </div>
                        {loginError && <p>Invalid credentials</p>}
                        <button type ="Login">Login</button>
                    </form>
                </div>
                <br/>

                <div  className="login-window"> New User? Signup Now! 
                    <form onSubmit={makeSignUpRequest}>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input name="username" 
                                    type="text" 
                                    value={newUser.username} 
                                    onChange={handleNewUser} 
                                    required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input name="password"
                                    type="password" 
                                    value={newUser.password} 
                                    onChange={handleNewUser}
                                    required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmpwd">Confirm pwd:</label>
                            <input name="confirmpassword"
                                    type="password" 
                                    value={newUser.confirmpassword} 
                                    onChange={handleNewUser}
                                    required/>
                        </div>
                        {passwordsDoNotMatch && <p>passwords do not match</p>}
                        <button type ="Sign Up">Sign Up</button>
                        
                        <div className = "third-party-auth"> 
                            <img id="fblogo" src={fbLogo} alt="Image" />
                            <img id="glogo" src={googleLogo} alt="Image" />
                        </div>
                    </form>
                </div>              
            </div>
        )
    } else {
        <Home/>
    }
}


export default Login;
