import "reflect-metadata";
import express from 'express';
import cors from './middlewares/cors';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';
import AppDataSource from './database/index';

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

AppDataSource.initialize().then(() => {
  console.log('🎉 Database Connected');
  app.listen(3000, () => {
    console.log('🔥 Server Started at http://localhost:3000');
  });
});

