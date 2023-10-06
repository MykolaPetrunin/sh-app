import * as yup from 'yup';

export const recipeWeightCardValidation: yup.Schema<{ totalWeight: number; title: string }> =
  yup.object({
    totalWeight: yup
      .number()
      .required('Total weight is required')
      .positive('Total weight should be positive number'),
    title: yup.string().required(),
  });
