import { WALLET } from '../type';

const connect = (address) => {
    return{
        type: WALLET,
        payload: address
    }
}