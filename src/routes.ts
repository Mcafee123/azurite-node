import { Router, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import tables from './tables/Tables'

const ah = asyncHandler

const mountRoutes = (): Router => {
  var router = require('express').Router();
  router.get('/', (req: Request, res: Response) => {
    res.send('Azurite APIs ready')
  })
  // tables
  router.get('/tables', ah(tables.listTables))
  router.delete('/tables/:name', ah(tables.deleteTable))
  router.put('/tables/:name', ah(tables.createTable))
  // entities
  router.get('/table/:name', ah(tables.listEntities))
  router.get('/table/:name/:pk/:rk', ah(tables.get))
  router.put('/table/:name', ah(tables.save))
  router.delete('/table/:name/:pk/:rk', ah(tables.deleteEntity))
  
  // router.get('/blobs', require('./blobs/containers'))
  return router
}

export default mountRoutes;