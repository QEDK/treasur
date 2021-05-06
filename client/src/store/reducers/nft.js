import { GET_INFO } from '../type';

const initialState = {
    info: null
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case GET_INFO:
            return{
                info: [...state.info, action.payload]
            }
        
        default:
            return state;
    }
}

export default reducer;