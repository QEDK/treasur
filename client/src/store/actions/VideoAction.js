import { PLACE_OFFER, SET_VIDEO_URL } from '../type';

export const placeOffer = (tokenURI) => {
    return {
        type: PLACE_OFFER,
        payload: tokenURI
    }
}

