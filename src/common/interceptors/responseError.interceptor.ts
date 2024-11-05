import { Response } from 'express';

type ApiResponse = {
  success: boolean;
  message: string;
  data?: any;
}

export const responseInterceptor = (res: Response, status: number, message: string, data: any) => {
  const responseMes: ApiResponse = {
    success: status < 400 ? true : false, 
    message: message,
    data: data,
  }

  return res.status(status).json(responseMes);
}