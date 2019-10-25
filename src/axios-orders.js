import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-cashier.firebaseio.com/'
});

export default instance;