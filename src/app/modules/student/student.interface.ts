//import { Schema, model, connect } from 'mongoose';

import { Model } from 'mongoose';

//interface--->>schema--->>model--->>>dbquery.
//client-->>route-->>controller-->>service-->>model-->>
//Response message--->>{success,message,data}
// 1. Create an interface representing a document in MongoDB.
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TUserName = {
  firstName: string;
  midlleName?: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateofBirth?: string;
  contactNo: string;
  emergencyContactNo: string;

  email: string;
  presentAddress: string;
  permanentAdress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'block';
  isDeleted: boolean;
  addedDate: Date;
  updateDate: Date;
};
//for creating custom instance
// export type TStudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// export type TStudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   TStudentMethods
// >;

//for creating static method

export interface TStudentModel extends Model<TStudent> {
  isUserExist(id: string): Promise<TStudent | null>;
}
