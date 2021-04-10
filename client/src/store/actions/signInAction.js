import { PROFILE, SIGN_OUT } from '../type';

export const signIn = (data) => {
    return {
        type: PROFILE,
        payload: data
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT,
    }
}