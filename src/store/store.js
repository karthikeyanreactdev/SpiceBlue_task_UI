import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import TaskReducer from '../store/reducer/taskReducer';
// creating and store and passing reducer and thunk middleware as parameter
let store=createStore(TaskReducer, applyMiddleware(thunk));
export default store
