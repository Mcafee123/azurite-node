import 'mocha'
import { expect } from 'chai'
import { createTable, deleteTable, listTables } from './testhelper'

describe('tables', () => {

  it('can list tables', (done) => {
    const name = 'mytesttable1'
    createTable(done, name, () => {
      listTables(done, (res) => {
        const json = res.body
        console.log(json)
        expect(json.length).to.equal(1, 'one table expected')
        deleteTable(done, name, () => {
          done()
        })
      })
    })
  })

  it('create table', (done) => {
    const name = 'mytesttable2'
    createTable(done, name, (res) => {
      const json = JSON.parse(res.text ?? '""')
      console.log(json)
      expect(json.ok).to.equal(name, 'table not created')
      deleteTable(done, name, () => {
        done()
      })
    })
  })

  it('delete table', (done) => {
    const name = 'mytesttable3'
    createTable(done, name, () => {
      deleteTable(done, name, (res) => {
        const json = JSON.parse(res.text ?? '""')
        console.log(json)
        expect(json.deleted).to.equal(name, 'table not deleted')
        done()
      })
    })
  })
})