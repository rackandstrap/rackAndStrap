const initialState = {

    userInfo: {'username':'',
                'name':'',
                'homebase': '',
                'job':[],
                'provide':[],
            }


};

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case 'AUTH':
            return {
                ...state,
                userInfo: action.payload
            };
        default:
            return state;
    }
};

export default reducer;