import * as yup from 'yup';
import { ProductFormData } from '../interfaces/productFormData';

const greaterThan0 = (value: string): boolean => {
  const numberValue = parseFloat(value);
  return numberValue > 0;
};

export const productValidation: yup.Schema<ProductFormData> = yup.object({
  title: yup.string().required('Title is required'),
  fats: yup
    .string()
    .required('Fats is required')
    .test('is-greater-than-zero', 'Fats should be greater than zero', greaterThan0),
  carbohydrates: yup
    .string()
    .required('Carbohydrates is required')
    .test('is-greater-than-zero', 'Carbohydrates should be greater than zero', greaterThan0),
  proteins: yup
    .string()
    .required('Proteins is required')
    .test('is-greater-than-zero', 'Proteins should be greater than zero', greaterThan0),
});
