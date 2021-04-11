import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import signIn from './reducers/signIn';
import connectWallet from './reducers/connectWallet';
import Video from './reducers/Video'

const reducer = combineReducers({
    signIn,
    connectWallet,
    Video
});

const store = configureStore({
    reducer
})

export default store;