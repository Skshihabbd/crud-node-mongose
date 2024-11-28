import { z } from 'zod';

// UserName Schema
const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name is required')
    .max(10, 'First Name cannot be more than 10 characters')
    .regex(
      /^[A-Z][a-zA-Z]*( [A-Z][a-zA-Z]*)*$/,
      'First Name must start with a capital letter and have one  space between words',
    )
    .transform((value) => value.trim().replace(/\s+/g, ' ')), // Removes multiple spaces
  midlleName: z.string().min(1, 'Middle Name is required'),
  lastName: z
    .string()
    .min(1, 'Last Name is required')
    .regex(/^[a-zA-Z]+$/, 'Last Name must contain only alphabetic characters'),
});

// Guardian Schema
const guardianSchema = z.object({
  fatherName: z
    .string()
    .max(20, 'Father Name cannot be more than 20 characters')
    .min(1, 'Father Name is required'),
  fatherOccupation: z.string().min(1, 'Father Occupation is required'),
  fatherContactNo: z.string().min(1, 'Father Contact Number is required'),
  motherName: z.string().min(1, 'Mother Name is required'),
  motherOccupation: z.string().min(1, 'Mother Occupation is required'),
  motherContactNo: z.string().min(1, 'Mother Contact Number is required'),
});

// Local Guardian Schema
const localGuardianSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  contactNo: z.string().min(1, 'Contact Number is required'),
  address: z.string().min(1, 'Address is required'),
});

// Student Schema
const studentJodvalidationSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  password: z.string().max(20),
  name: userNameSchema,
  gender: z.enum(['male', 'female', 'other'], {
    message: "Gender must be one of 'male', 'female', or 'other'",
  }),
  dateofBirth: z.string().optional(),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  contactNo: z.string().min(1, 'Contact Number is required'),
  emergencyContactNo: z.string().min(1, 'Emergency Contact Number is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      message: 'Invalid blood group',
    })
    .optional(),
  presentAddress: z.string().min(1, 'Present Address is required'),
  permanentAdress: z.string().min(1, 'Permanent Address is required'),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string().url().optional(),
  isActive: z
    .enum(['active', 'block'], {
      message: "Status must be 'active' or 'block'",
    })
    .default('active'),
  isDeleted: z.boolean().default(false),
});

export default studentJodvalidationSchema;
