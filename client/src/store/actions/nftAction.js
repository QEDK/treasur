import { GET_INFO, GET_MY_NFT } from '../type';
import axios from 'axios'

export const getInfo = async (uri) => {
    const data = await axios.get('/info', {uri});
    return {
        type: GET_INFO,
        payload: data
    }
}

export const getMyNFT = async (address) => {
    const data = await axios.get(`/owned/${address}`);
    console.log('DATA', data.data);
    return {
        type: GET_MY_NFT,
        payload: data.data
    }
}