import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/users/users.routes';
export const app = express();

// parsers.
app.use(express.json());
app.use(cors());

// users routes.
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
