import * as yup from 'yup';

export const productCardValidation: yup.Schema<{ quantity: number }> = yup.object({
  quantity: yup
    .number()
    .required('Quantity is required')
    .moreThan(0, 'Quantity should be greater than 0'),
});
