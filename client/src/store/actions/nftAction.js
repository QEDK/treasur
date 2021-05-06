import { GET_INFO } from '../type';
import axios from 'axios'

const getInfo = async (uri) => {
    const data = await axios.get('/info', {uri});
    return {
        type: GET_INFO,
        payload: data
    }
}