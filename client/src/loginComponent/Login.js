import React from "react";
import { useState } from "react";
import user from '../userList';
import User from '../userComponent/UserProfile';
import { connect } from "react-redux";
import { auth } from '../action';
import './login.css';
import fbLogo from './logo/f_logo_RGB-Blue_58.png';
import googleLogo from './logo/Google__G__Logo.svg.png'


const Login = (props) =>{

    const[username, setUserName] = useState('');
    const[password, setPassword] = useState('');
    const[validuser, setValidUser] = useState();

    const[newUser, setNewUser] = useState({
        username: '',
        password: '',
        confirmpassword: '',
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
        //Add check user list?
        console.log(username, password);

        //This is where we set the user?

        for(let i of user){
            if (i.password === password & i.username === username){
                console.log("successful login");
                console.log(i);
                // setValidUser(i);
                //update redux object
                props.auth(i.firstname);

            }
        }

        if(validuser != undefined){
            console.log(validuser.name);
        }else{
            console.error("Did not find a valid user!");
        }
        
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
        let validPWD = false;
        if(newUser.password === newUser.confirmpassword){
            validPWD = true;
        }

        if(foundDuplicate){
            console.error('userName already taken');
        }
        if(!validPWD){
            console.error('password need to match');
        }

        if(!foundDuplicate && validPWD){
            props.auth(newUser.username);
        }
        
    }

    const handleNewUser=(event)=>{
        event.preventDefault();
        setNewUser({...newUser,[event.target.name]: event.target.value})
    }

    if(!props.firstname){
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
                            <label>Username:</label>
                            <input name="username" 
                                    type="text" 
                                    value={newUser.username} 
                                    onChange={handleNewUser} 
                                    required/>
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input name="pwd"
                                    type="password" 
                                    // value={newUser.password} 
                                    onChange={handleNewUser}
                                    required/>
                        </div>
                        <div className="form-group">
                            <label>Confirm PW:</label>
                            <input name="confirmpwd"
                                    type="password" 
                                    // value={newUser.confirmpassword} 
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
            <div>You logged in!
                <User userObj={props.firstname}/>
            </div>
        )
    }
    

}

const mapStateToProps = (state) =>{
    return{
        firstname: state.firstname,
    };
};

const mapDispatchToProps = {
    auth,
};

export default connect(mapStateToProps, mapDispatchToProps) (Login);