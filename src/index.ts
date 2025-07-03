import express from 'express';
import { AppDataSource } from './config/data-source';
import { routes } from './routes';

AppDataSource.initialize().then(() => {
  
  const app = express();

  app.use(express.json());
  app.use('/v1', routes);

  app.listen(process.env.PORT, () => {
    console.log('Server Running!')
  })
})