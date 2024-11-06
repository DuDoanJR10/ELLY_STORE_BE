import { Application } from 'express'
import userRouter from './user/userRouter'
import userAdminRouter from './user/adminRouter'
import productUserRouter from './product/userRouter'
import productAdminRouter from './product/adminRouter'
import categoryAdminRouter from './category/adminRouter'

function router(app: Application) {
  //user api
  app.use('/api/user', userRouter)

  //admin user api
  app.use('/api/admin', userAdminRouter)

  //category user api

  //category admin api
  app.use('/api/admin/category', categoryAdminRouter)

  //product user api
  app.use('/api/product', productUserRouter)

  //product admin api
  app.use('/api/admin/product', productAdminRouter)
}

export default router