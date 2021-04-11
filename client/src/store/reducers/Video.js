import { PLACE_OFFER, SET_VIDEO_URL } from '../type';

const initialState = {
    videoURL: null,
    tokenURI: null
}
 const reducer = (state = initialState, action) => {

    switch(action.type){
        case PLACE_OFFER:
            return{
                ...state,
                tokenURI: action.payload
            }

        case SET_VIDEO_URL:
            return {
                ...state,
                videoURL: action.payload
            }

        default:
            return state
    }
}

export default reducer;