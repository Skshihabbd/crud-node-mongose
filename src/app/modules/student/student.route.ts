import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();
router.post('/create-student', StudentController.createStudent);
router.get('/create-student', StudentController.getAllStudent);
router.get('/single/:studentid', StudentController.getAllStudentById);
router.put('/single/:studentid', StudentController.deleteStudentFromDb);
router.put('/singles/:studentId', StudentController.updateStudent);

export const StudentRoute = router;
