import { PROFILE } from '../type';

export const signIn = (data) => {
    return {
        type: PROFILE,
        payload: data
    }
}