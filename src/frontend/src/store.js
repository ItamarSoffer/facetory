import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import usersReducer from './Reducers/usersReducer';

//Add reducers
const store = createStore(
    combineReducers({
        usersReducer,
    }),
    {},
    applyMiddleware(thunk)
);

export default store;