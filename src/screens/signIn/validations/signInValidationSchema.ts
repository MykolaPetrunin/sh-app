import { SignInData } from '../interfaces/signInData';
import * as yup from 'yup';

export const signInValidationSchema: yup.Schema<SignInData> = yup.object({
  email: yup.string().required('Email is required').email('Enter a valid email'),
  password: yup.string().required('Password is required').min(8, 'Password should be of minimum 8 characters length'),
});
