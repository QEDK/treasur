import { PROFILE } from '../type';

const initialState = {
    givenName: null,
    email: null,
    avatar: null,
}

const reducer = (state = initialState, action) => {
    console.log(action)
    switch(action.type){
        case PROFILE:
            return {
                ...state,
                givenName: action.payload.givenName,
                email: action.payload.email,
                avatar: action.payload.imageUrl
            }
        default:
            return state;
    }
}

export default reducer;