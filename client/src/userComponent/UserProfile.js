import React from 'react';

const User=({userObj})=>{

    console.log(userObj);
    return(
        <div>you are....
            {/* <p>username: {userObj.username}</p>
            <p>id: {userObj.id}</p> */}
            <p>firstname: {userObj}</p>
        </div>
    )
}

export default User;