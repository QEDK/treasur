import { PROFILE, SIGN_OUT } from '../type';

const initialState = {
    givenName: null,
    email: null,
    avatar: null,
    isAuthenticated: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case PROFILE:
            return {
                ...state,
                givenName: action.payload.givenName,
                email: action.payload.email,
                avatar: action.payload.imageUrl,
                isAuthenticated: true
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