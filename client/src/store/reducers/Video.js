import { PLACE_OFFER, ADD_VIDEO } from '../type';

const initialState = {
    tokenURI: null,
    videos: []
}
 const reducer = (state = initialState, action) => {

    switch(action.type){
        case PLACE_OFFER:
            return{
                ...state,
                tokenURI: action.payload
            }

        case ADD_VIDEO:
            return {
                ...state,
                videos: [...state.videos, action.payload]
            }


        default:
            return state
    }
}

export default reducer;