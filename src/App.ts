import express, { NextFunction, Request, Response } from 'express'
import HttpException from './exceptions/HttpException'
import mountRoutes from './routes'

class App {
  public app

  private errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.json({ error: err.message })
  }

  constructor () {
    this.app = express()
    this.app.use(express.json({ strict: false})) // before route handlers!
    this.app.use('/', mountRoutes())
    this.app.use(this.errorHandler);
  }
}

export default new App().app
