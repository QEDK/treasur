import { PROFILE, SIGN_OUT } from '../type';

const initialState = {
    givenName: null,
    email: null,
    avatar: null,
    isAuthenticated: false,
    googleId: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case PROFILE:
        console.log(action.payload)
            return {
                ...state,
                givenName: action.payload.givenName,
                email: action.payload.email,
                avatar: action.payload.imageUrl,
                isAuthenticated: true,
                googleId: action.payload.googleId
            }
        case SIGN_OUT:
            return {
                ...state,
                givenName: null,
                email: null,
                avatar: null,
                isAuthenticated: false
            }
        default:
            return state;
    }
}

export default reducer;