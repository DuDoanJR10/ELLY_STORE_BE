import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: any;
  }
}

export interface CustomRequest extends Request {
  user?: any;
}
