import { createStore } from 'redux';
import reducer from './reducer';

//note we might have to change this to redux toolkit

const store = createStore(reducer);

export default store;