import { query } from 'express-validator';

export const paginationValidationRules = () => {
  return [
    // Check that 'page' is present, is an integer, and is greater than 0
    query('page').notEmpty().withMessage('Page parameter is required'),

    // Check that 'limit' is present, is an integer, and is greater than 0
    query('limit').notEmpty().withMessage('Limit parameter is required')
  ];
};
