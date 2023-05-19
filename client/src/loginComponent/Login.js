import React from "react";
import { useState, useEffect } from "react";
import user from '../userList';
import User from '../userComponent/UserProfile';
import { connect } from "react-redux";
import { auth } from '../action';
import './login.css';
import fbLogo from './logo/f_logo_RGB-Blue_58.png';
import googleLogo from './logo/Google__G__Logo.svg.png';
// import axios from 'axios';

const axios = require('axios')

const Login = ({userInfo, auth}) =>{

    /*
    We can just use userInfo from our store as we need.
    */

    const[username, setUserName] = useState('');
    const[password, setPassword] = useState('');
    const[validuser, setValidUser] = useState();

    const[newUser, setNewUser] = useState({
        username: '',
        password: '',
        confirmpassword: '',
        name:'',
        homebase: '',
    });
    
    const handleUserNameChange=(e)=>{
        setUserName(e.target.value);
    }

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }

    const attempLogin=async(event)=>{
        event.preventDefault();
        
        // console.log(username, password);
        // const loginObject = {'username': username, 'password': password}
        try{
            let result = await axios({
                method:'post',
                url: 'http://localhost:3000/user/',
                data: {'username': username,   
                        'password': password}
                })
            console.log(result.data)
            auth(result.data);
        } catch(error){
            console.error("Cannot AUTH user!");
        }
    }

    const attempSignUp = async(event)=>{
        event.preventDefault();
    
        //We might want to do some min req for password strength
        //For example pwd lenght more than 6
        let validPWD = false;
        if(newUser.password === newUser.confirmpassword){
            console.log(newUser.password)
            console.log(newUser.confirmpassword)
            validPWD = true;
        }

        if(!validPWD){
            console.error('password need to match');
        }

        if(validPWD){

            try{
                let result = await axios({
                    method:'post',
                    url: 'http://localhost:3000/user/create',
                    data: {'username': newUser.username, 'password': newUser.password}
                    })
                console.log(result.data)
                auth(result.data);
            } catch (error){
                console.error("Cannot create new user", error);
            }
            
        }
    }

    const handleNewUser=(event)=>{
        console.log(event.target.name, event.target.value);
        setNewUser({...newUser,[event.target.name]: event.target.value});
    }

    if(!userInfo.username){
        return(
            <div className="Auth-window">
                
                <div  className="login-window"> Login
                    <form onSubmit={attempLogin}>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" value={username} onChange={handleUserNameChange} required/>
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" value={password} onChange={handlePasswordChange} required/>
                        </div>
                        <button type ="Login">Login</button>
                    </form>
                </div>
                <br/>

                <div  className="login-window"> New User? Signup Now! 
                    <form onSubmit={attempSignUp}>
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
        return(
            // <div>You logged in!
                <User/>
            // </div>
        )
    }
    

}

const mapStateToProps = (state) =>{
    return{
        userInfo: state.userInfo,
    };
};

const mapDispatchToProps = {
    auth,
};

export default connect(mapStateToProps, mapDispatchToProps) (Login);