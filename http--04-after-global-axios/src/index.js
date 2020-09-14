import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// true for all requests that are being sent
// do this to help shorten the URL in our components when 
// we are doing HTTP requests
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// shared across all files in the project
// will affect all HTTP requests in the app
axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config - can do this too
    // must return the request config or else you are blocking the request
    return request;

    // add a function which handles any errors
}, error => {
    console.log(error);
    // do this to be able to log it to handle it with our catch method
    return Promise.reject(error);
});

// do this for responses as well
axios.interceptors.response.use(response => {
    // success response
    console.log(response);
    // Edit request config
    return response;
}, error => {
    console.log(error);
    // still handle them locally in the catch block of a component
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
