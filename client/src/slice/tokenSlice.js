import { createSlice } from "@reduxjs/toolkit";

export const token = createSlice({
    name: 'usertoken',
    initialState: {
        'value': ""
    },
    reducers:{
        setToken:(state, action) => {
            state.value = action.payload;
        },
        removeToken:state =>{
            state.value = "";
        },
    }
})

export const {setToken, removeToken} = token.actions
export default token.reducer 