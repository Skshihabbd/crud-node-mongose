import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();
router.post('/create-student', StudentController.createStudent);
router.get('/create-student', StudentController.getAllStudent);
router.get('/single/:studentid', StudentController.getAllStudentById);
router.delete('/single/:studentid', StudentController.deleteStudentFromDb);

export const StudentRoute = router;
