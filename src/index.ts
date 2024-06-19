import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import AccountRoutes from './v1/routes/account';
import CategoryRoutes from './v1/routes/category';

dotenv.config();

const app: express.Application = express();
const PORT: string = process.env.PORT ?? '5000';

app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use(AccountRoutes);
app.use(CategoryRoutes); 

app.listen(PORT, () => {
  console.log(`server up and running at http://localhost:${PORT}`);
});
