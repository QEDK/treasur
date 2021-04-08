import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import signIn from './reducers/signIn';
import connectWallet from './reducers/connectWallet';

const reducer = combineReducers({
    signIn,
    connectWallet
});

const store = configureStore({
    reducer
})

export default store;