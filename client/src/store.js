import { createStore } from 'redux';
import reducer from './reducer';

//note we might have to change this to redux toolkit

const store = createStore(reducer);

//I assume you can add more "reducer" to this store. 

export default store;