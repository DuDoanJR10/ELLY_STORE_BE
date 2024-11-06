import { Response } from 'express';

type ApiResponse = {
  success: boolean;
  message: string;
  data?: any;
  meta?: meta;
}

type meta = {
  page: number;
  limit: number;
  total: number;
}

export const responseInterceptor = (res: Response, status: number, message: string, data: any, meta?: meta) => {
  const responseMes: ApiResponse = {
    success: status < 400 ? true : false, 
    message: message,
    data: data,
  }

  if (meta) {
    responseMes["meta"] = meta;
  }

  return res.status(status).json(responseMes);
}