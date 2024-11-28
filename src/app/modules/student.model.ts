import { model, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentModel,
  TUserName,
} from './student/student.interface';
import config from '../config';
import { boolean } from 'joi';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    // maxlength: [10, 'First-Name can not be more than 20'],
    // validate: [
    //   {
    //     validator: function (value: string) {
    //       const firstName = value.charAt(0).toUpperCase() + value.slice(1);
    //       return firstName === value;
    //     },
    //     message: '{VALUE} is not in capitalize format',
    //   },
    //   {
    //     validator: function (value) {
    //       const oneSpaceValidation = /^[a-zA-Z]+( [a-zA-Z]+)*$/.test(
    //         value.trim(),
    //       );
    //       return oneSpaceValidation;
    //     },
    //     message: '{VALUE} is more than one space',
    //   },
    // ],
    //set: (value: string) => value.trim().replace(/\s+/g, ' '), // this line remove any type of double space in a line of string of every word check and remove if any word have  more than one space middle of any two word
  },
  midlleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (value: string) {
    //     return validator.isAlpha(value);
    //   },
    //   message: '{VALUE } is not valid string',
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'first name is have to give must'],
    //maxlength: 20,
  },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, TStudentModel>(
  {
    id: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: [true, 'password is required'],

      maxlength: [20, 'password connot be more than 20 charecter'],
    },
    name: { type: userNameSchema, required: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    dateofBirth: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email type',
      },
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not supported ',
      },
    },
    presentAddress: { type: String, required: true },
    permanentAdress: { type: String, required: true },
    guardian: { required: true, type: guardianSchema },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImg: { type: String },
    isActive: {
      type: String,
      enum: ['active', 'block'],
      default: 'active',
    },
    isDeleted: { type: Boolean, default: false },
    addedDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      virtuals: true,
    },
    versionKey: false,
  },
);

// virtuals
studentSchema.virtual('fullName').get(function () {
  return ` ${this.name.firstName}  ${this.name.midlleName} ${this.name.lastName}`;
});
// virtuals

//query middle-ware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//query middle-ware

//aggreagte middle ware

studentSchema.pre('aggregate', function (next) {
  console.log(this.pipeline());
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//aggreagte middle ware

//Document  middleware
studentSchema.pre('save', async function (next) {
  //console.log(this, 'post hook: saved our data bbbbbbbbbbbbbbbbbbbbbb');
  //hassing password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
//pre save middleware/hook
studentSchema.post('save', function (result, next) {
  result.password = '';
  next();
});
//Document  middleware
//post save middleware/hook

//creating a custom static method
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};
//creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await StudentModel.findOne({ id });
//   return existingUser;
// };

export const StudentModel = model<TStudent, TStudentModel>(
  'User',
  studentSchema,
);
