import axios from 'axios';

// creates a copy of the axios object
// this will let us be able to control in which parts of the app
// we want to use the default settings
// and in other parts where we want more control
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// instance.interceptors.request...

export default instance;