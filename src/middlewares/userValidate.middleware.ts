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

export const userVerifyEmailValidationRules = () => {
  return [
    // Kiểm tra trường 'email' không được để trống
    body('email').notEmpty().withMessage('Email is required'),
    
    // Kiểm tra email có định dạng hợp lệ
    body('email').isEmail().withMessage('Invalid email format'),

    // Kiểm tra trường 'code' không được để trống
    body('code').notEmpty().withMessage('Code is required'),

    // Kiểm tra trường 'code' có độ dài chính xác 6 ký tự
    body('code').isLength({ min: 6, max: 6 }).withMessage('Code must be exactly 6 characters long'),
  ];
};
