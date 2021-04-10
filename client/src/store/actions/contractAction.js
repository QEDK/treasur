import { CONTRACT } from '../type';

export const holdContracts = (contracts) => {
    return {
        type: CONTRACT,
        payload: contracts
    }
}