import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import rootReducer from './rootReducer';


const middlewares = [logger,thunk];



const store = createStore(rootReducer, applyMiddleware(...middlewares));


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store;