import { CONTRACT } from '../type';
const initialState = {
    YTContract: {},
    TreasurContract: {}
}
export const reducer = (state = initialState, action) => {
    console.log(action.payload)
    
    switch(action.type){

        case CONTRACT:
            return{
                ...state,
                YTContract: action.payload[0],
                TreasurContract: action.payload[1]
            }

            default:
                return state;
    }
}