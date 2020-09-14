import axios from 'axios';

// config our own axios instance for this base url
// so we avoid setting a global default for the URL
// which could affect things down the road
const instance = axios.create({
    baseURL: 'https://react-my-burger-7d58a.firebaseio.com/'
});

export default instance;