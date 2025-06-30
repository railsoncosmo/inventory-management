import express from 'express';
import { AppDataSource } from './config/data-source';

AppDataSource.initialize().then(() => {
  
  const app = express();

  app.use(express.json());
  app.get('/teste', (req, res) => {
    return res.json('tudo certo')
  })

  app.listen(process.env.PORT, () => {
    console.log('Server Running!')
  })
})