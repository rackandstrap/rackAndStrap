
// //I assume you can add more "reducer" to this store. 

// export default store;

import { configureStore } from '@reduxjs/toolkit'
import authUser from './slice/authUserSlice'
import loginState from './slice/loginSlice'
import token from './slice/tokenSlice'

export default configureStore({
    reducer: {
        userInfo: authUser,
        loginStateValue: loginState,
        userToken: token
    }
})