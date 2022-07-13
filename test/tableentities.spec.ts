import { createTable, deleteTable, saveEntity, listEntities, getEntity, deleteEntity, queryEntities } from './testhelper';
import 'mocha'
import { expect } from 'chai'

const entity1 = {
  partitionKey: 'a',
  rowKey: '1',
  date: new Date(),
  testString: 'first Inserted Object ok?'
}
const entity2 = {
  partitionKey: 'a',
  rowKey: '2',
  date: new Date(),
  testString: 'second Inserted Object ok?'
}

describe('entities', () => {
  it('can save an entity', (done) => {
    const name = 'saveentitytable'
    createTable(done, name, () => {
      saveEntity(done, name, entity1, (res) => {
        expect(res.body.ok.partitionKey).to.equal(entity1.partitionKey, 'entity not saved')
        deleteTable(done, name, () => {
          done()
        }) 
      })
    })
  })
  
  it('can list entities', (done) => {
    const name = 'entitytable'
    createTable(done, name, () => {
      saveEntity(done, name, entity1, () => {
        saveEntity(done, name, entity2, () => {
          listEntities(done, name, (res) => {
            expect(res.body.length).to.equal(2, 'added two entities, they must be there')
            deleteTable(done, name, () => {
              done()
            })  
          })
        })
      })
    })
  })

  it('can query entities', (done) => {
    const name = 'entitytable'
    createTable(done, name, () => {
      saveEntity(done, name, entity1, () => {
        saveEntity(done, name, entity2, () => {
          queryEntities(done, name, 'testString eq \'second Inserted Object ok?\'', (res) => {
            expect(res.body.length).to.equal(1, 'queried one entity')
            deleteTable(done, name, () => {
              done()
            })  
          })
        })
      })
    })
  })

  it('can get a single entity', (done) => {
    const name = 'singleentitytable'
    createTable(done, name, () => {
      saveEntity(done, name, entity1, () => {
        getEntity(done, name, entity1.partitionKey, entity1.rowKey, (res) => {
          expect(res.body.partitionKey).to.equal(entity1.partitionKey, 'pk wrong')
          expect(res.body.rowKey).to.equal(entity1.rowKey, 'rk wrong')
          expect(res.body.testString).to.equal(entity1.testString, 'testString wrong')
          deleteTable(done, name, () => {
            done()
          }) 
        })
      })
    })
  })

  it('can delete an entity', (done) => {
    const name = 'deleteentitytable'
    createTable(done, name, () => {
      saveEntity(done, name, entity1, () => {
        deleteEntity(done, name, entity1.partitionKey, entity1.rowKey, (res) => {
          const ok = res.body.ok
          expect(ok.pk).to.equal(entity1.partitionKey, 'pk wrong')
          expect(ok.rk).to.equal(entity1.rowKey, 'rk wrong')
          deleteTable(done, name, () => {
            done()
          })
        })
      })
    })
  })
})
