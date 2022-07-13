import { NextFunction, Request, Response } from 'express'
import app from './App'
import config from './config'
import HttpException from './exceptions/HttpException'

const port = process.env.PORT || config.port

app.listen(port, () => {
  return console.log(`server is listening on ${port}`)
})