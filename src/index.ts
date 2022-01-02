import express, { Application, Response, NextFunction } from 'express';
import connect from './connectDB';
import UserRouter from './routes/UserRouter';
import RecipesRouter from './routes/RecipesRouter';
import dotenv from 'dotenv';
import cors from 'cors';

(async () => {
  const app: Application = express();
  const port: number | string = process.env.PORT || 3001;

  dotenv.config();

  const dbUser = process.env.DATABASE_USER;
  const dbPassword = process.env.DATABASE_PASSWORD;
  const localUri = 'mongodb://localhost/recipesAPI';
  const mongodbUri: string = `mongodb+srv://${dbUser}:${dbPassword}@recipes-4rrlu.gcp.mongodb.net/test?retryWrites=true&w=majority`;

  connect(mongodbUri);

  //TODO: remove body-parser dependency
  //TODO: not only local host
  app.use(
    cors({
      credentials: true,
      origin: [
        'http://localhost:3000',
        'http://localhost:3005',
        'https://i-am-awesome-in-the-kitchen.herokuapp.com',
      ],
    })
  );
  app.use(express.json());
  app.use('/api', UserRouter);
  app.use('/api', RecipesRouter);

  app.get('/', (_req, res: Response, _next: NextFunction) => {
    res.send('Welcome to this awesome recipes website backend!');
  });

  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
})();
