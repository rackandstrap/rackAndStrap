import { createSlice } from "@reduxjs/toolkit";

export const loginState = createSlice({
    name: 'loginStateValue',
    initialState: {
        'value': false
    },
    reducers:{
        login:state => {
            state.value = true;
        },
        logout:state =>{
            state.value = false;
        },
    }
})

export const {login} = loginState.actions
export default loginState.reducer 