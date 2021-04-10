import { PROFILE, SIGN_OUT } from '../type';

const initialState = {
    givenName: null,
    email: null,
    avatar: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case PROFILE:
            return {
                ...state,
                givenName: action.payload.givenName,
                email: action.payload.email,
                avatar: action.payload.imageUrl
            }
        case SIGN_OUT:
            return {
                ...state,
                givenName: null,
                email: null,
                avatar: null
            }
        default:
            return state;
    }
}

export default reducer;