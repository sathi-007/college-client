import agent from './networkagent';
import {
  LOGIN,
  LOGOUT,
  ASYNC_START,
  ASYNC_END,
  REGISTER
} from './constants/actionTypes';
import { redirect } from './actions';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    // const currentView = store.getState().viewChangeCounter;
    // const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState()
        // if (!skipTracking && currentState.viewChangeCounter !== currentView) {
        //   return
        // }
        console.log('RESULT', res.data);
        action.payload = res.data;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState()
        // if (!skipTracking && currentState.viewChangeCounter !== currentView) {
        //   return
        // }
        
        if(error.response){
          action.error = true;
          action.payload = error;
          console.log('ERROR', error.response.status, error.response.data);
          if(error.response.status==400 || error.response.status==401){
              const errorData = error.response.data
              // if(errorData.error_code==='NEO478'){ //token expired
                console.log('Token expired')
                agent.setToken(null);
                store.dispatch({ type: LOGOUT, payload: action.payload })
                store.dispatch(redirect('/'))
                return;
              // }
          }
        }
        // if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        // }
        store.dispatch(action);
      }
    );

    return;
  }
  next(action);
};


const localStorageMiddleware = store => next => action => {
    if (action.type === REGISTER || action.type === LOGIN) {
      if (!action.error) {
        window.localStorage.setItem('@token', action.token);
        agent.setToken(action.token);
      }
    } else if (action.type === LOGOUT) {
      window.localStorage.setItem('@token', '');
      agent.setToken(null);
    }
  
    next(action);
  };

  function isPromise(v) {
    return v && typeof v.then === 'function';
  }


  export { promiseMiddleware,localStorageMiddleware }