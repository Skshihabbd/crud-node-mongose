import express, { Application, Request, Response } from 'express';
import { StudentRoute } from './app/modules/student/student.route';
const app: Application = express();
import cors from 'cors';
app.use(cors());
app.use(express.json());
//api/v1/students/create-student
//application route
app.use('/api/v1/students', StudentRoute);

const getAController = (req: Request, res: Response) => {
  res.send('Hello World shihab sheikh!');
};

app.get('/', getAController);

export default app;
