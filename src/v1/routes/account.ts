import express from 'express';

import { getAllAccount, getAccountById } from '../controllers/account';

const route = express.Router();

route.get('/api/v1/account', getAllAccount);
route.get('/api/v1/account/:id', getAccountById);

export default route;
