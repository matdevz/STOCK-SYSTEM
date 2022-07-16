import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import { productRouter } from './routes/productRouter';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/product', productRouter);

mongoose.connect(`mongodb://${process.env.DATABASE_URL}`, (err) => {
	err
		? console.log(`Houve um erro: ${err}`)
		: console.log('Mongodb Connected');
});

app.listen(process.env.PORT);
