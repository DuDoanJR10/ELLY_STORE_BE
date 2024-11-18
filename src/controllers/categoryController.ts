import { Request, Response } from 'express';
import CategoryModel from '../models/category.model';
import { responseInterceptor } from '../common/interceptors/responseError.interceptor';

class CategoryController {
  public async createAdmin(req: Request, res: Response) {
    const { name } = req.body;
    try {
      const newCategory = await CategoryModel.create({ name });

      return responseInterceptor(res, 201, 'Tạo danh mục thành công', newCategory);
    } catch (error) {
      return responseInterceptor(res, 500, 'Có lỗi xảy ra', null);
    }
  }

  public async getListAll(req: Request, res: Response) {
    try {
      const categories = await CategoryModel.findAll();

      return responseInterceptor(res, 200, 'Lấy danh sách danh mục thành công', categories);
    } catch (error) {
      return responseInterceptor(res, 500, 'Có lỗi xảy ra', null);
    }
  }

  public async updateAdmin(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const category = await CategoryModel.findByPk(id);
      if (!category) {
        return responseInterceptor(res, 404, 'Không tìm thấy danh mục', null);
      }

      category.name = name;
      await category.save();

      return responseInterceptor(res, 200, 'Cập nhật danh mục thành công', category);
    } catch (error) {
      return responseInterceptor(res, 500, 'Có lỗi xảy ra', null);
    }
  }

  public async deleteAdmin(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const category = await CategoryModel.findByPk(id);
      if (!category) {
        return responseInterceptor(res, 404, 'Không tìm thấy danh mục', null);
      }

      await category.destroy();

      return responseInterceptor(res, 200, 'Xóa danh mục thành công', null);
    } catch (error) {
      console.log(error);
      return responseInterceptor(res, 500, 'Có lỗi xảy ra', null);
    }
  }
}

export default new CategoryController();