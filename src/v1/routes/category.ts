import express from 'express';

import { 
    getCategories, 
    getCategoryById, 
    addCategory,
    updateCategory,
    deleteCategory
} from '../controllers/category';
import { verifyToken } from '../../utils/middleware';

const route = express.Router();

route.get('/api/v1/category', verifyToken, getCategories);
route.get('/api/v1/category/:id', verifyToken, getCategoryById);
route.post('/api/v1/category', addCategory);
route.put('/api/v1/category/:id', updateCategory);
route.delete('/api/v1/category/:id', deleteCategory);

export default route;