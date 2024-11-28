import { StudentModel } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  //custom statics method
  if (await StudentModel.isUserExist(studentData.id)) {
    throw new Error('User already exists!');
  }
  const result = await StudentModel.create(studentData); //mongose builtin static method of class
  // const student = new StudentModel(studentData); //create an instance
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists!');
  // }

  //const result = await student.save(); //mongose builtin instance method
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({ id: id });
  const result = StudentModel.aggregate([{ $match: { id } }]);
  return result;
};
const deleteStudentFromDBs = async (id: string) => {
  const result = await StudentModel.updateOne({ id: id }, { isDeleted: true });
  return result;
};
const updateStudentData = async (id: string) => {
  const result = await StudentModel.updateOne(
    { id: id },
    {
      $set: {
        updateDate: new Date().toISOString().replace('Z', '+00:00'),
      },
    },
  );
  return result;
};
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDBs,
  updateStudentData,
};
