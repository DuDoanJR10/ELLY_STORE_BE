import { Request, Response, NextFunction } from 'express';
import tokenService from '../services/token.service';
import { TokenTypes } from '../common/constants/token.constant';
import { RoleTypes } from '../common/constants/role.constant';
import { ApiResponse } from '../types/ApiResponse';
import { CustomRequest } from '../types/express';
import { responseInterceptor } from '../common/interceptors/responseError.interceptor';

export const verifyTokenUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const tokenBearer = req.header('Authorization');
  const token = tokenBearer?.split('Bearer')[1].trim();
  if (!token) {
    const response: ApiResponse = {
      success: false,
      message: 'Unauthorized',
    }
    return res.status(401).json(response);
  }

  try {
    const verified = await tokenService.verifyToken(token, TokenTypes.ACCESS);
    if (!verified) {
      return responseInterceptor(res, 401, 'Unauthorized', null);
    }

    if (verified.role != RoleTypes.USER) {
      return responseInterceptor(res, 401, 'No permission', null);
    }

    req.user = verified;
    next();
  } catch (err) {
    responseInterceptor(res, 500, 'Có lỗi xảy ra', null);
  }
}

export const verifyTokenAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const tokenBearer = req.header('Authorization');
  const token = tokenBearer?.split('Bearer')[1].trim();
  if (!token) {
    return responseInterceptor(res, 401, 'Unauthorized', null);
  }

  try {
    const verified = await tokenService.verifyToken(token, TokenTypes.ACCESS);
    if (!verified) {
      const response: ApiResponse = {
        success: false,
        message: 'Unauthorized',
      }
      return res.status(401).json(response);
    }

    if (verified.role != RoleTypes.ADMIN) {
      return responseInterceptor(res, 401, 'No permission', null);
    }

    req.user = verified;
    next();
  } catch (err) {
    responseInterceptor(res, 500, 'Có lỗi xảy ra', null);
  }
}