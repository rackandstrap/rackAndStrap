import React from "react";
import { useState } from "react";
import user from '../userList';
import User from '../userComponent/UserProfile';
import { connect } from "react-redux";
import { auth } from '../action';


const Login = (props) =>{

    const[username, setUserName] = useState('');
    const[password, setPassword] = useState('');
    const[validuser, setValidUser] = useState();
    
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

    if(!props.firstname){
        return(
            <div className="login-window">Login
            
                <form onSubmit={attempLogin}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={handleUserNameChange}/>
                    </label>
                    <label>
                        Password:
                        <input type="text" value={password} onChange={handlePasswordChange}/>
                    </label>
                    <button type ="Login">Login</button>
                </form>
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