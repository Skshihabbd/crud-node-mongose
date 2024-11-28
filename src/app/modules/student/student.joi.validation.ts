import Joi from 'joi';

//creating a schema validation using joi
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(10)
    .regex(/^[A-Z][a-zA-Z]*( [A-Z][a-zA-Z]*)*$/)
    .message(
      'First name must be in capitalized format and have one space between words',
    ),
  midlleName: Joi.string().required().trim(),
  lastName: Joi.string()
    .required()
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .message('Last name must contain only alphabetic characters'),
});

// Joi validation schema for Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().max(20).messages({
    'string.max': 'Father name cannot exceed 20 characters',
    'any.required': 'Father name is required',
  }),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

// Joi validation schema for Local Guardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Joi validation schema for Student
const studentSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'ID is required',
  }),
  name: userNameValidationSchema.required(),
  gender: Joi.string().required().valid('male', 'female', 'other').messages({
    'any.only': 'Gender must be male, female, or other',
  }),
  dateofBirth: Joi.string().optional(),
  email: Joi.string().required().email().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only': 'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-',
    }),
  presentAddress: Joi.string().required(),
  permanentAdress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().uri().optional().messages({
    'string.uri': 'Profile image must be a valid URI',
  }),
  isActive: Joi.string().valid('active', 'block').default('active').messages({
    'any.only': 'Status must be either active or block',
  }),
  isDeleted: Joi.boolean().default(false),
});

export default studentSchema;
