import { Request, Response } from 'express';
import { responseInterceptor } from '../common/interceptors/responseError.interceptor';
import UserModel from '../models/user.model';
import argon2 from 'argon2';
import { RoleTypes } from '../common/constants/role.constant';
import tokenService from '../services/token.service';
import { getRandomSixDigitString } from '../common/helpers/getRandomSixDigitString';
import redisService from '../services/redis.service';
import { KeyRedis } from '../common/constants/KEY_REDIS.constant';
import mailService from '../services/mail.service';

class userController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    
    try {
      const user = await UserModel.findOne({ where: { email } });

      if (user) {
        return responseInterceptor(res, 400, 'Email đã tồn tại', null);
      }

      const hassedPassword = await argon2.hash(password)
      const newUser = await UserModel.create({
        name,
        email,
        password: hassedPassword,
        role: RoleTypes.USER,
        active: false,
      });

      if (!newUser) {
        return responseInterceptor(res, 400, 'Đăng ký thất bại', null);
      }

      const code = getRandomSixDigitString();
      await redisService.setValue(`${KeyRedis.VERIFY_EMAIL}_${newUser.id}`, code.toString(),  5 * 60);
      await mailService.sendMailVerifyCode(email, code);

      return responseInterceptor(res, 201, 'Đăng ký thành công', null);
    } catch (error) {
      console.log(error);
      responseInterceptor(res, 500, 'Có lỗi xảy ra', null);
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        return responseInterceptor(res, 400, 'Email không tồn tại', null);
      }

      const isPasswordValid = await argon2.verify(user.password, password);

      if (!isPasswordValid) {
        return responseInterceptor(res, 400, 'Mật khẩu không chính xác', null);
      }

      if (!user.active) {
        return responseInterceptor(res, 400, 'Tài khoản chưa được kích hoạt', {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            active: user.active,
          },
        });
      }

      if (user.role !== RoleTypes.USER) {
        return responseInterceptor(res, 400, 'Tài khoản không có quyền truy cập', null);
      }

      await tokenService.removeTokenUser(user);

      const tokens = await tokenService.generateAuthTokens(user);

      return responseInterceptor(res, 200, 'Đăng nhập thành công', {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          active: user.active,
        },
        tokens,
      });
    } catch (error) {
      console.log(error);
      responseInterceptor(res, 500, 'Có lỗi xảy ra', null);
    }
  }

  async verifyEmail(req: Request, res: Response) {
    const { email, code } = req.body;

    try {
      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        return responseInterceptor(res, 400, 'Email không tồn tại', null);
      }

      if (user.active) {
        return responseInterceptor(res, 400, 'Email đã được kích hoạt', null);
      }

      const codeInRedis = await redisService.getValue(`${KeyRedis.VERIFY_EMAIL}_${user.id}`);

      if (!codeInRedis) {
        return responseInterceptor(res, 400, 'Mã xác thực đã hết hạn', null);
      }

      if (code !== codeInRedis) {
        return responseInterceptor(res, 400, 'Mã xác thực không chính xác', null);
      }

      await UserModel.update({ active: true }, { where: { email } });

      return responseInterceptor(res, 200, 'Kích hoạt tài khoản thành công', null);
    } catch (error) {
      responseInterceptor(res, 500, 'Có lỗi xảy ra', null);
    }
  }

  async adminLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ where: { email } });
      console.log(user);

      if (!user) {
        return responseInterceptor(res, 400, 'Email không tồn tại', null);
      }

      const isPasswordValid = await argon2.verify(user.password, password);

      if (!isPasswordValid) {
        return responseInterceptor(res, 400, 'Mật khẩu không chính xác', null);
      }

      if (user.role !== RoleTypes.ADMIN) {
        return responseInterceptor(res, 400, 'Tài khoản không có quyền truy cập', null);
      }

      await tokenService.removeTokenUser(user);

      const tokens = await tokenService.generateAuthTokens(user);

      return responseInterceptor(res, 200, 'Đăng nhập thành công', {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          active: user.active,
        },
        tokens,
      });
    } catch (error) {
      console.log(error);
      responseInterceptor(res, 500, 'Có lỗi xảy ra', null);
    }
  }
}

export default new userController();