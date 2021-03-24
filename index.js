import express, { Application, Response, NextFunction } from 'express';
import connect from './src/connectDB';
import UserRouter from './src/routes/UserRouter';
import dotenv from 'dotenv';
import cors from 'cors';

(async () => {
  const app = express();
  const port = 3001 || process.env.PORT;
  dotenv.config();

  const dbUser = process.env.DATABASE_USER;
  const dbPassword = process.env.DATABASE_PASSWORD;
  const localUri = 'mongodb://localhost/recipesAPI';
  const mongodbUri = `mongodb+srv://${dbUser}:${dbPassword}@recipes-4rrlu.gcp.mongodb.net/test?retryWrites=true&w=majority`;

  connect(mongodbUri);

  //TODO: remove body-parser dependency
  //TODO: not only local host
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
  app.use(express.json());
  app.use('/api', UserRouter);

  app.get('/', (_req, res, _next) => {
    res.send('Welcome to this awesome recipes website backend!');
  });

  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
})();
