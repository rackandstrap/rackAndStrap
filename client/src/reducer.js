const initialState = {
    id:null,
    username:'',
    password:'',
    firstname:'',

};

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case 'AUTH':
            return {
                ...state,
                firstname: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;