import { PLACE_OFFER, ADD_VIDEO } from '../type';

export const placeOffer = (tokenURI) => {
    return {
        type: PLACE_OFFER,
        payload: tokenURI
    }
}

export const addVideo = (tokenURI) => {
    return {
        type: ADD_VIDEO,
        payload: tokenURI
    }
}

