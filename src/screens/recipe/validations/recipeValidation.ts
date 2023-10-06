import * as yup from 'yup';
import { RecipeFormData } from '../interfaces/recipeFormData';

const productSchema = yup.object({
  id: yup.string().required('Product id is required'),
  title: yup.string().required('Product name is required'),
  proteins: yup.number().required(),
  fats: yup.number().required(),
  carbohydrates: yup.number().required(),
  calories: yup.number().required(),
  quantity: yup
    .number()
    .required('Quantity is required')
    .positive('Quantity must be a positive number'),
});

export const recipeValidation: yup.Schema<RecipeFormData> = yup.object({
  title: yup.string().required('Title is required'),
  products: yup
    .array()
    .of(productSchema)
    .required('Products are required')
    .min(1, 'At least one product is required'),
});
