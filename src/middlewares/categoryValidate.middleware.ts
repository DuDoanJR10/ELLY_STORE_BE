import { body } from 'express-validator';

export const categoryCreateValidationRules = () => {
  return [
    // Kiểm tra trường 'name' không được để trống
    body('name').notEmpty().withMessage('Name is required'),
  ];
}