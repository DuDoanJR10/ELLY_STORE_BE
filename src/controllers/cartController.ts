import { responseInterceptor } from "../common/interceptors/responseError.interceptor";
import { Response } from "express";
import { CustomRequest } from "../types/express";
import CartModel from "../models/cart.models";
import ProductAttributeModel from "../models/productAttribute.model";

class CartController {
  public async addToCart(req: CustomRequest, res: Response) {
    const { productAttrId, quantity } = req.body;
    const userToken = req.user;

    try {
      // Validate product attribute
      const productAttr = await ProductAttributeModel.findOne({
        where: { id: productAttrId },
      });
      if (!productAttr) {
        return responseInterceptor(res, 404, "Không tìm thấy sản phẩm", null);
      }

      if (productAttr.quantity < quantity) {
        return responseInterceptor(
          res,
          400,
          "Số lượng sản phẩm không đủ",
          null
        );
      }

      // Retrieve or create cart
      let cartUser = await CartModel.findOne({
        where: { userId: userToken.id },
      });
      if (!cartUser) {
        cartUser = await CartModel.create({
          userId: userToken.id,
          items: [{ productAttrId, quantity }],
        });
        return responseInterceptor(
          res,
          201,
          "Thêm vào giỏ hàng thành công",
          cartUser
        );
      }

      // Update cart
      const cartItems = cartUser.items;
      const index = cartItems.findIndex(
        (item) => item.productAttrId === productAttrId
      );

      if (index !== -1) {
        if (productAttr.quantity - cartItems[index].quantity < quantity) {
          return responseInterceptor(
            res,
            400,
            "Số lượng sản phẩm không đủ",
            null
          );
        }
        cartItems[index].quantity += quantity;
      } else {
        cartItems.push({ productAttrId, quantity });
      }

      cartUser.items = cartItems;
      await CartModel.update(
        { items: cartItems },
        { where: { userId: userToken.id } }
      );

      return responseInterceptor(
        res,
        200,
        "Thêm vào giỏ hàng thành công",
        cartUser
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
      return responseInterceptor(res, 500, "Có lỗi xảy ra", null);
    }
  }

  public async getCart(req: CustomRequest, res: Response) {
    const userToken = req.user;

    try {
      const cart = await CartModel.findOne({ where: { userId: userToken.id } });
      if (!cart) {
        return responseInterceptor(res, 404, "Không tìm thấy giỏ hàng", null);
      }

      const productAttrIds = cart.items.map((item) => item.productAttrId);
      const productAttrs = await ProductAttributeModel.findAll({
        where: { id: productAttrIds },
      });

      const items = cart.items.map((item) => {
        const productAttr = productAttrs.find(
          (attr) => attr.id === item.productAttrId
        );
        if (productAttr) {
          return {
            productAttrId: item.productAttrId,
            quantity: item.quantity,
            color: productAttr.color,
            size: productAttr.size,
          };
        }
        return item;
      });

      return responseInterceptor(res, 200, "Lấy giỏ hàng thành công", {
        ...cart.toJSON(),
        items,
      });
    } catch (error) {
      console.error("Error retrieving cart:", error);
      return responseInterceptor(res, 500, "Có lỗi xảy ra", null);
    }
  }

  public async deleteItemCart(req: CustomRequest, res: Response) {
    const { productAttrId } = req.body;
    const userToken = req.user;

    try {
      const cart = await CartModel.findOne({ where: { userId: userToken.id } });
      if (!cart) {
        return responseInterceptor(res, 404, "Không tìm thấy giỏ hàng", null);
      }

      const cartItems = cart.items;
      const index = cartItems.findIndex(
        (item) => item.productAttrId === productAttrId
      );

      if (index === -1) {
        return responseInterceptor(res, 404, "Không tìm thấy sản phẩm", null);
      }

      cartItems.splice(index, 1);
      await CartModel.update(
        { items: cartItems },
        { where: { userId: userToken.id } }
      );

      return responseInterceptor(res, 200, "Xóa sản phẩm thành công", null);
    } catch (error) {
      console.error("Error deleting item from cart:", error);
      return responseInterceptor(res, 500, "Có lỗi xảy ra", null);
    }
  }
}

export default new CartController();
