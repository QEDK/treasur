import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk'
import signIn from './reducers/signIn';
import connectWallet from './reducers/connectWallet';
import nft from './reducers/nft';
import Video from './reducers/Video'

const reducer = combineReducers({
    signIn,
    connectWallet,
    video: Video,
    nft
});

const store = configureStore({
    reducer
})

export default store;