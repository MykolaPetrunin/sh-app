import { SignUpData } from '../interfaces/signUpData';
import * as yup from 'yup';

export const signUpValidationSchema: yup.Schema<SignUpData> = yup.object({
  userName: yup.string().required('User name is required'),
  email: yup.string().required('Email is required').email('Enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be of minimum 8 characters length'),
  repeatPassword: yup
    .string()
    .required('Repeat password is required')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .min(8, 'Repeat password should be of minimum 8 characters length'),
});
