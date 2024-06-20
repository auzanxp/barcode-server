import express from 'express';

import { 
    getAllAccount, 
    getAccountById, 
    loginAccount, 
    registerAccount 
} from '../controllers/account';

const route = express.Router();

route.get('/api/v1/account', getAllAccount);
route.get('/api/v1/account/:id', getAccountById);
route.post('/api/v1/register', registerAccount);
route.post('/api/v1/login', loginAccount);

export default route;
