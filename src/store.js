import { createBrowserHistory } from 'history' 
import allReducers from './reducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { localStorageMiddleware ,promiseMiddleware} from './middleware';
export const history = createBrowserHistory()

export const store = createStore(
    allReducers,
    applyMiddleware(localStorageMiddleware,promiseMiddleware,thunk)
);
