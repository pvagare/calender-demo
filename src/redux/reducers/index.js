import { CalenderReducer } from './CalenderReducer.js';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    feature : CalenderReducer,
});

export default rootReducer;

