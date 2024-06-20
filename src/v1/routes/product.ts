import express from 'express';

import { 
    getProducts, 
    getProductById, 
    addProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product';

const route = express.Router();

route.get('/api/v1/products', getProducts);
route.get('/api/v1/products/:id', getProductById);
route.post('/api/v1/products', addProduct);
route.put('/api/v1/products/:id', updateProduct);
route.delete('/api/v1/products/:id', deleteProduct);

export default route;