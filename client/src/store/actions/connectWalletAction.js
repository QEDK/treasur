import { WALLET } from '../type';

export const connect = (address) => {
    return{
        type: WALLET,
        payload: address
    }
}