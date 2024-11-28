import { Request, Response } from 'express';
import { StudentServices } from './student.service';
//import studentSchema from './student.validation';

import studentJodvalidationSchema from './student.Jod.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    //data validation using jod
    // const studentValidationSchema = z.object({
    //   id: z.string(),
    //   name: z.object({
    //     firstName: z
    //       .string()
    //       .max(20, { message: 'first name connot be more than 20 characters' }),
    //   }),
    // });

    const zodParseData = studentJodvalidationSchema.parse(studentData);

    //data validation using joi
    //const { error } = studentSchema.validate(studentData);
    //const result = await StudentServices.createStudentIntoDB(studentData);
    const result = await StudentServices.createStudentIntoDB(zodParseData);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'some-thing went wrong',
    //     error: error.details,
    //   });
    // }
    //will call service function to send thid data

    //send response
    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'some-thing went wrong',
      error: err,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'some-thing went wrong',
      error: err,
    });
  }
};
const getAllStudentById = async (req: Request, res: Response) => {
  try {
    const { studentid } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentid);
    res.status(200).json({
      success: true,
      message: 'data get successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'some-thing went wrong',
      error: err,
    });
  }
};
const deleteStudentFromDb = async (req: Request, res: Response) => {
  try {
    const { studentid } = req.params;

    const result = await StudentServices.deleteStudentFromDBs(studentid);
    res.status(200).json({
      success: true,
      message: 'student is deleted  successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'some-thing went wrong',
      error: err,
    });
  }
};
const updateStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.updateStudentData(studentId);
    res.status(200).json({
      success: true,
      message: 'student updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
export const StudentController = {
  createStudent,
  getAllStudent,
  getAllStudentById,
  deleteStudentFromDb,
  updateStudent,
};
