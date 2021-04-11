import { PLACE_OFFER } from '../type';

const initialState = {
    tokenURI: null
}
 const reducer = (state = initialState, action) => {

    switch(action.type){
        case PLACE_OFFER:
            return{
                ...state,
                tokenURI: action.payload
            }


        default:
            return state
    }
}

export default reducer;