import 'express-async-errors';
import 'dotenv/config'
import express from 'express';
import { AppDataSource } from './config/data-source';
import { routes } from './routes';
import { globalError } from './middleware/globalError';

AppDataSource.initialize().then(() => {
  
  const app = express();

  app.use(express.json());
  app.use('/v1', routes);
  app.use(globalError);

  app.listen(process.env.PORT, () => {
    console.log('Server Running!')
  })
})