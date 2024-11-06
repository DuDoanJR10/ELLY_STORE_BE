import { body } from 'express-validator';

export const productCreateValidationRules = () => {
  return [
    // Kiểm tra trường 'name' không được để trống
    body('name').notEmpty().withMessage('Name is required'),

    // Kiểm tra trường 'description' không được để trống
    body('description').notEmpty().withMessage('Description is required'),
    
    // Kiểm tra trường 'price' không được để trống
    body('price').notEmpty().withMessage('Price is required'),
    
    // Kiểm tra trường 'price' phải là số
    body('price').isNumeric().withMessage('Price must be a number'),

    // Kiểm tra trường 'thumbnail' không được để trống
    body('thumbnail').notEmpty().withMessage('Thumbnail is required'),

    // Kiểm tra trường 'image_urls' không được để trống
    body('image_urls').notEmpty().withMessage('Image urls is required'),

    // Kiểm tra trường 'category_id' không được để trống
    body('category_id').notEmpty().withMessage('Category id is required'),

    // Kiểm tra trường 'category_id' phải là UUID
    body('category_id').isUUID().withMessage('Category id must be UUID'),
    
    // kiểm tra trường product_attribute không được để trống
    body('product_attribute').notEmpty().withMessage('Product attribute is required'),

    // kiểm tra trường product_attribute phải là mảng
    body('product_attribute').isArray().withMessage('Product attribute must be an array'),

    // kiểm tra trong mảng product_attribute là object và có các trường size color quantity image_color_url
    body('product_attribute.*.size').notEmpty().withMessage('Size is required'),
    body('product_attribute.*.color').notEmpty().withMessage('Color is required'),
    body('product_attribute.*.quantity').notEmpty().withMessage('Quantity is required'),
    body('product_attribute.*.quantity').isNumeric().withMessage('Quantity must be a number'),
    body('product_attribute.*.image_color_url').notEmpty().withMessage('Image color url is required'),
  ];
}