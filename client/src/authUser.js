// const initialState = {

//     userInfo: {'username':'',
//                 'name':'',
//                 'homebase': '',
//                 'job':[],
//                 'provide':[],
//             }


// };

// const reducer = (state = initialState, action) =>{
//     switch(action.type){
//         case 'AUTH':
//             return {
//                 ...state,
//                 userInfo: action.payload
//             };
//         default:
//             return state;
//     }
// };

// export default reducer;

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
        }
    }
})

export const {auth} = authUser.actions
export default authUser.reducer 