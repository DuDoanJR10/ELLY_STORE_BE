import { body } from 'express-validator';

export const userRegisterValidationRules = () => {
  return [
    // Kiểm tra trường 'name' không được để trống
    body('name').notEmpty().withMessage('Name is required'),
    
    // Kiểm tra email có định dạng hợp lệ
    body('email').isEmail().withMessage('Invalid email format'),
    
    // Kiểm tra password có độ dài tối thiểu 6 ký tự
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ];
};

export const userLoginValidationRules = () => {
  return [
    // Kiểm tra email có định dạng hợp lệ
    body('email').isEmail().withMessage('Invalid email format'),
    
    // Kiểm tra password có độ dài tối thiểu 6 ký tự
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ];
};
