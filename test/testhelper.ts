import app from '../src/App'
import request, { Response } from 'supertest'

type callback = (res: Response) => void

const debug = false ? 'debug=ok' : ''

// Tables

export const createTable = (done: Mocha.Done, name: string, callback: callback) => {
  request(app)
    .put(`/tables/${name}`)
    .query(debug)
    .expect(200)
    .end((err, res: Response) => {
      if (err) {
        done(err)
      }
      callback(res)
    })
}

export const listTables = (done: Mocha.Done, callback: callback) => {
  request(app)
    .get(`/tables`)
    .query(debug)
    .expect(200)
    .end((err, res: Response) => {
      if (err) {
        done(err)
      }
      callback(res)
    })
}

export const deleteTable = (done: Mocha.Done, name: string, callback: callback) => {
  request(app)
    .delete(`/tables/${name}`)
    .query(debug)
    .end((err, res: Response) => {
      if (err) {
        done(err)
      }
      callback(res)
    })
}

// Entities

export const saveEntity = (done: Mocha.Done, name: string, entity: object, callback: callback) => {
  request(app)
    .put(`/table/${name}`)
    .type('application/json')
    .send(entity)
    .query(debug)
    .end((err, res: Response) => {
      if (err) {
        done(err)
      }
      callback(res)
    })
}

export const queryEntities = (done: Mocha.Done, name: string, query: string, callback: callback) => {
  const qry: any = {
    filter: query
  }
  if (debug) {
    qry.debug = 'ok'
  }
  request(app)
    .get(`/table/${name}`)
    .query(qry)
    .end((err, res: Response) => {
      if (err) {
        done(err)
      }
      callback(res)
    })
}

export const listEntities = (done: Mocha.Done, name: string, callback: callback) => {
  request(app)
    .get(`/table/${name}`)
    .query(debug)
    .end((err, res: Response) => {
      if (err) {
        done(err)
      }
      callback(res)
    })
}

export const getEntity = (done: Mocha.Done, name: string, pk: string, rk: string, callback: callback) => {
  request(app)
    .get(`/table/${name}/${pk}/${rk}`)
    .query(debug)
    .end((err, res: Response) => {
      if (err) {
        done(err)
      }
      callback(res)
    })
}

export const deleteEntity = (done: Mocha.Done, name: string, pk: string, rk: string, callback: callback) => {
  request(app)
    .delete(`/table/${name}/${pk}/${rk}`)
    .query(debug)
    .end((err, res: Response) => {
      if (err) {
        done(err)
      }
      callback(res)
    })
}