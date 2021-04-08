import { WALLET } from '../type';

const initialState = {
    address: null
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case WALLET:
            return{
                ...state,
                address: action.payload
            }

        default:
            return state;
    }

}

export default reducer;