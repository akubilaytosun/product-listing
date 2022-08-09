import axios from 'axios';



export default {
    getProductList() {
        return axios.get(`https://fakestoreapi.com/products`);
    }
};
