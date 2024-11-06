import { Request, Response } from "express";
import ProductModel from "../models/product.model";
import { responseInterceptor } from "../common/interceptors/responseError.interceptor";
import ProductAttributeModel from "../models/productAttribute.model";
import { Op } from "sequelize";
import CategoryModel from "../models/category.model";

class ProductController {
  public async createProduct(req: Request, res: Response) {
    const {
      name,
      description,
      price,
      thumbnail,
      image_urls,
      category_id,
      product_attribute,
    } = req.body;

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
        let quantity_in_stock = 0;
        const attribute = product_attribute.map((item: any) => {
          quantity_in_stock += item.quantity;
          return {
            product_id: newProduct.id,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            image_color_url: item.image_color_url,
          };
        });

        await ProductAttributeModel.bulkCreate(attribute);

        await newProduct.update({ quantity_in_stock });
      }

      return responseInterceptor(
        res,
        201,
        "Tạo sản phẩm thành công",
        newProduct
      );
    } catch (error) {
      console.log(error);
      responseInterceptor(res, 500, "Có lỗi xảy ra", null);
    }
  }

  public async findProduct(req: Request, res: Response) {
    const { page, limit } = req.query;
    const querys: any = req.query;
    const querysPayload: any = {};

    if (querys.name) {
      querysPayload["name"] = { [Op.like]: `%${querys.name}%` };
    }

    if (querys.category_id) {
      querysPayload["category_id"] = querys.category_id;
    }

    // Pagination parameters
    const offset = (Number(page) - 1) * Number(limit); // Calculate offset for pagination
    const limitNumber = Number(limit);

    try {
      const products = await ProductModel.findAndCountAll({
        where: querysPayload,
        limit: limitNumber,
        offset: offset,
        include: [
          {
            model: CategoryModel,
            as: "category",
            attributes: ["name"],
          },
        ]
      });

      return responseInterceptor(
        res,
        200,
        "Lấy danh sách sản phẩm thành công",
        products.rows,
        {
          page: Number(page),
          limit: limitNumber,
          total: products.count,
        }
      );
    } catch (error) {
      console.log(error);
      responseInterceptor(res, 500, "Có lỗi xảy ra", null);
    }
  }

  public async findProductDetail(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return responseInterceptor(res, 400, "Thiếu id sản phẩm", null);
    }

    try {
      const product = await ProductModel.findOne({
        where: { id },
        include: [
          {
            model: ProductAttributeModel,
            as: "product_attributes",
            attributes: ["id", "size", "color", "quantity", "image_color_url"],
          },
          {
            model: CategoryModel,
            as: "category",
            attributes: ["name"],
          },
        ],
      });

      if (!product) {
        return responseInterceptor(res, 404, "Không tìm thấy sản phẩm", null);
      }

      return responseInterceptor(
        res,
        200,
        "Lấy thông tin sản phẩm thành công",
        product
      );
    } catch (error) {
      console.log(error);
      responseInterceptor(res, 500, "Có lỗi xảy ra", null);
    }
  }

  public async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      thumbnail,
      image_urls,
      category_id,
      product_attribute,
    } = req.body;

    if (!id) {
      return responseInterceptor(res, 400, "Thiếu id sản phẩm", null);
    }

    try {
      const product = await ProductModel.findOne({ where: { id } });

      if (!product) {
        return responseInterceptor(res, 404, "Không tìm thấy sản phẩm", null);
      }

      await product.update({
        name,
        description,
        price,
        thumbnail,
        image_urls,
        category_id,
      });

      if (product_attribute.length > 0) {
        let quantity_in_stock = 0;
        const attribute = product_attribute.map((item: any) => {
          quantity_in_stock += item.quantity;
          return {
            product_id: product.id,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            image_color_url: item.image_color_url,
          };
        });

        await ProductAttributeModel.destroy({ where: { product_id: id } });
        await ProductAttributeModel.bulkCreate(attribute);

        await product.update({ quantity_in_stock });
      }

      return responseInterceptor(res, 200, "Cập nhật sản phẩm thành công", null);
    } catch (error) {
      console.log(error);
      responseInterceptor(res, 500, "Có lỗi xảy ra", null);
    }
  }

  public async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return responseInterceptor(res, 400, "Thiếu id sản phẩm", null);
    }

    try {
      const product = await ProductModel.findOne({ where: { id } });

      if (!product) {
        return responseInterceptor(res, 404, "Không tìm thấy sản phẩm", null);
      }

      await ProductAttributeModel.destroy({ where: { product_id: id } });
      await product.destroy();

      return responseInterceptor(res, 200, "Xóa sản phẩm thành công", null);
    } catch (error) {
      console.log(error);
      responseInterceptor(res, 500, "Có lỗi xảy ra", null);
    }
  }
}

export default new ProductController();
