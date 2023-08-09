import React from 'react';
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';


import { useSelector, useDispatch } from "react-redux";

const User=()=>{

    const userInfo2 = useSelector(state => state.userInfo);

    console.log(userInfo2);
    console.log(useSelector(state => state.userToken))

    return(
        <div>Profile View
            <p>username:{userInfo2.username}</p>
            <p>userID:{userInfo2._id}</p>
            <p>name:{userInfo2.name}</p>
            <p>homebase:{userInfo2.homebase}</p>
            {/* My jobs should be in the my jobs page */}
            {/* <p>Jobs:</p>
            <ul>
                {userInfo2.jobs.map(jobs_id => <li key={uuidv4()}>{jobs_id}</li>)}
            </ul> */}
   
            {/* <p>provide:{userInfo2.provide}</p> */}
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        userInfo: state.userInfo
    };
}

export default User;