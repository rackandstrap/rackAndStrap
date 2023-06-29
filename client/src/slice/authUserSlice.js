import { createSlice } from '@reduxjs/toolkit'

export const authUser = createSlice({
    name: 'userInfo',
    initialState: {
        '_id': '',
        'username':'',
        'name':'',
        'homebase': '',
        'job':[],
        'provide':[],
        'createdAt': '',
        'updatedAt': '',
    },
    reducers:{
        auth:(state, action)=>{
            return action.payload;
        },
        clearUserInfo:state=>{
            return{
                '_id': '',
                'username':'',
                'name':'',
                'homebase': '',
                'job':[],
                'provide':[],
                'createdAt': '',
                'updatedAt': '',
            }
        }
    }
})

export const {auth,clearUserInfo} = authUser.actions
export default authUser.reducer 