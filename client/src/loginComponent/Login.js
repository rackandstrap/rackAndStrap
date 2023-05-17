import React from "react";
import { useState } from "react";
import user from '../userList';
import User from '../userComponent/UserProfile';
import { connect } from "react-redux";
import { auth } from '../action';
import './login.css';
import fbLogo from './logo/f_logo_RGB-Blue_58.png';
import googleLogo from './logo/Google__G__Logo.svg.png'


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

    const attempLogin=(event)=>{
        event.preventDefault();
        console.log(username, password);

        //This is where we set the user?
        //Todo: call API to login the user 
        //Todo: return error message. 
        
        
    }

    const attempSignUp=(event)=>{
        event.preventDefault();
        ///check user in the database
        let foundDuplicate = false;
        for(let i of user){
            if (i.username === newUser.username){
                console.error('userName already taken');
                foundDuplicate = true;
                break;
            }
        }
        //We might want to do some min req for password strength
        //For example pwd lenght more than 6
        let validPWD = false;
        if(newUser.password === newUser.confirmpassword){
            console.log(newUser.password)
            console.log(newUser.confirmpassword)
            validPWD = true;
        }

        if(foundDuplicate){
            console.error('userName already taken');
        }
        if(!validPWD){
            console.error('password need to match');
        }

        if(!foundDuplicate && validPWD){

            auth({'username':newUser.username,
                    'name': "Placeholder here",
                    'homebase':'',
                    'job': [],
                    'provide': []});
            
        }
    }

    const handleNewUser=(event)=>{
        // event.preventDefault();
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
                            <input type="text" value={username} onChange={handleUserNameChange}/>
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" value={password} onChange={handlePasswordChange}/>
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
                            <label htmlFor="confirmpwd">Confirm PW:</label>
                            <input name="confirmpassword"
                                    type="password" 
                                    value={newUser.confirmpassword} 
                                    onChange={handleNewUser}
                                    required/>
                        </div>
                        <button type ="Sign Up">Sign Up</button>
                        
                        <div className = "third-party-auth"> 
                            <img src={fbLogo} alt="Image" />
                            <img src={googleLogo} alt="Image" />
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