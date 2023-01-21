import { Router, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import tables from './tables/Tables'
import blobs from './blobs/Blobs'

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
  // blobs
  router.get('/blobs/:containername', ah(blobs.listBlobs))
  router.put('/blobs/:containername/:file', ah(blobs.uploadText))
  router.post('/blobs/:containername', ah(blobs.upload))

  return router
}

export default mountRoutes;