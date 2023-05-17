export const auth = (userInfo) =>{
    return{
        type: 'AUTH',
        payload: userInfo,
    };
};