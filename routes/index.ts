import { Application } from 'express'
import userRouter from './user'

function router(app: Application) {
  app.use('/api/user', userRouter)
}

export default router