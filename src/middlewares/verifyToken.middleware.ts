import { Request, Response, NextFunction } from 'express';
import tokenService from '../services/token.service';
import { TokenTypes } from '../common/constants/token.constant';
import { RoleTypes } from '../common/constants/role.constant';

export const verifyTokenUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
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
      const response: ApiResponse = {
        success: false,
        message: 'Unauthorized',
      }
      return res.status(401).json(response);
    }

    if (verified.role != RoleTypes.USER) {
      const response: ApiResponse = {
        success: false,
        message: 'Không có quyền truy cập',
      }
      return res.status(401).json(response);
    }

    req.user = verified;
    next();
  } catch (err) {
    const response: ApiResponse = {
      success: false,
      message: 'Có lỗi xảy ra',
    }
    res.status(400).json(response);
  }
}