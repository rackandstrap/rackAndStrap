export const auth = (newString) =>{
    return{
        type: 'AUTH',
        payload: newString,
    };
};