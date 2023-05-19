import React from 'react';
import { connect } from 'react-redux';

const User=({userInfo})=>{

    
    return(
        <div>Profile View
            <p>username:{userInfo.username}</p>
            <p>name:{userInfo.name}</p>
            <p>homebase:{userInfo.homebase}</p>
            <p>job:{userInfo.job}</p>
            <p>provide:{userInfo.provide}</p>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        userInfo: state.userInfo
    };
}

export default connect(mapStateToProps) (User);