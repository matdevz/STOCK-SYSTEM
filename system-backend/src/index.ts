import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { productRouter } from './routes/productRouter';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/product', productRouter);

app.listen(process.env.PORT);
