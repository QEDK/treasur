import { GET_INFO, GET_MY_NFT } from '../type';

const initialState = {
    info: [],
    myNFT: null
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case GET_INFO:
            return{
                info: [...state.info, action.payload]
            }

        case GET_MY_NFT:
            return{
                myNFT
            }
        
        default:
            return state;
    }
}

export default reducer;