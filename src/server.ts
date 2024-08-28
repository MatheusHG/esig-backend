require("dotenv").config();
import "reflect-metadata";
import express from 'express';
import cors from './middlewares/cors';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';
import AppDataSource from './database/index';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

AppDataSource.initialize().then(() => {
  console.log('🎉 Database Connected');
  app.listen(port, () => {
    console.log(`🔥 Server Started at http://localhost:${port}`);
  });
});

