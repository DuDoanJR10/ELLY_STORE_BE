import { Request, Response } from 'express';
import ProductModel from '../models/product.model';
import { responseInterceptor } from '../common/interceptors/responseError.interceptor';
import ProductAttributeModel from '../models/productAttribute.model';

class ProductController {
  public async createProduct(req: Request, res: Response) {
    const { name, description, price, thumbnail, image_urls, category_id, product_attribute } = req.body;
    console.log(req.body);
    try {
      const newProduct = await ProductModel.create({
        name,
        description,
        price,
        thumbnail,
        image_urls,
        category_id,
      });

      if (product_attribute.length > 0) {
        const attribute = product_attribute.map((item: any) => {
          return {
            product_id: newProduct.id,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            image_color_url: item.image_color_url,
          };
        });

        await ProductAttributeModel.bulkCreate(attribute);
      }

      return responseInterceptor(res, 201, 'Tạo sản phẩm thành công', newProduct);
    } catch (error) {
      console.log(error);
      responseInterceptor(res, 500, 'Có lỗi xảy ra', null);
    }
  }

  public async findProduct(req: Request, res: Response) {
    const querys = req.query;
    const queryspayload = {}

    // if (querys.category_id) {
    //   queryspayload['category_id'] = querys.category_id;
    // }

    try {
      const products = await ProductModel.findAll();

      return responseInterceptor(res, 200, 'Lấy danh sách sản phẩm thành công', products);
    } catch (error) {
      console.log(error);
      responseInterceptor(res, 500, 'Có lỗi xảy ra', null);
    }
  }
}

export default new ProductController();