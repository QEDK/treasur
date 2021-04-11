import { PLACE_OFFER, SET_VIDEO_URL } from '../type';

export const placeOffer = (tokenURI) => {
    return {
        type: PLACE_OFFER,
        payload: tokenURI
    }
}

export const setVideoUrl = (url) => {
    return {
        type: SET_VIDEO_URL,
        payload: url
    }
}