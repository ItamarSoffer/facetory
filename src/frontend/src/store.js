import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import usersReducer from './Reducers/usersReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        usersReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
