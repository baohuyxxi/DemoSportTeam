import axios from '../axios';

const productAPI = {
    countProduct: async()=>
    {
        const response = await axios.get('products/7278544552145.json');
        return response.data;
    },
    pecialProduct: async()=>{
        const response = await axios.get('products/7278544552145.json');
        return response.data;
    },
    listProducts: async()=>{
        const response = await axios.get('products.json?ids=7278544552145,7278544715985');
        return response.data;
    },
    allProducts: async()=>{
        const response = await axios.get('products.json');
        return response.data;
    },
}

export default productAPI