import { Request, Response } from 'express'
import { ListTableEntitiesOptions, TableClient, TableServiceClient, odata } from '@azure/data-tables'
import config from '../config'

class Tables {

  private connstring
  constructor() {
    this.connstring = process.env.CONNSTRING || config.connstring
  }

  private createTableServiceClient(): TableServiceClient {
    const tableClient = TableServiceClient.fromConnectionString(
      this.connstring
    );
    return tableClient
  }

  private createTableClient(name: string): TableClient {
    const svc = TableClient.fromConnectionString(
      this.connstring,
      name
    )
    return svc
  }

  private createListTableEntityOptions(req: Request): ListTableEntitiesOptions | undefined {
    this.debuglog(req, 'filter', req.query['filter'])
    if (!req.query['filter']) {
      return undefined
    }
    const options: ListTableEntitiesOptions = {
      queryOptions: {
        filter: `${req.query['filter']}`
      }
    }
    this.debuglog(req, 'options', options)
    return options
  }

  private debuglog(req: Request, title: string, msg: any) {
    if (req.query && req.query['debug'] === 'ok') {
      console.log(`${title}:`, msg)
    }
  }

  //
  // tables
  //

  public listTables = async (req: Request, res: Response) => {
    this.debuglog(req, 'req', 'listTables')
    const cli = this.createTableServiceClient()
    const tablesIterator = cli.listTables()
    const tables = [];
    for await (const _table of tablesIterator) {
      tables.push(_table.name)
    }
    res.json(tables)
  }

  public createTable = async (req: Request, res: Response) => {
    this.debuglog(req, 'req', 'createTable')
    const name = req.params.name
    this.debuglog(req, 'create', name)
    const cli = this.createTableServiceClient()
    await cli.createTable(name)
    this.debuglog(req, 'create ok', name)
    res.json({ ok: name })
  }

  public deleteTable = async (req: Request, res: Response) => {
    this.debuglog(req, 'req', 'deleteTable')
    const name = req.params.name
    const cli = this.createTableServiceClient()
    this.debuglog(req, 'delete', name)
    await cli.deleteTable(name)
    this.debuglog(req, 'delete ok', name)
    res.json({ deleted: name })
  }

  //
  // entities
  //

  public listEntities = async (req: Request, res: Response) => {
    this.debuglog(req, 'req', 'listEntities')
    const svc = this.createTableClient(req.params.name)
    const entityIterator = svc.listEntities(this.createListTableEntityOptions(req))
    const entities = []
    for await (const _entity of entityIterator) {
      entities.push(_entity)
    }
    res.json(entities)
  }

  public get = async (req: Request, res: Response) => {
    this.debuglog(req, 'req', 'get')
    const svc = this.createTableClient(req.params.name)
    const pk = req.params.pk
    const rk = req.params.rk
    const options: ListTableEntitiesOptions = {
      queryOptions: {
        filter: odata`PartitionKey eq ${pk} and RowKey eq ${rk}`
      }
    }
    this.debuglog(req, 'options', options)
    const entityIterator = svc.listEntities(options)
    for await (const _entity of entityIterator) {
      res.json(_entity)
      break    
    }
  }

  public save = async (req: Request, res: Response) => {
    this.debuglog(req, 'req', 'save')
    const entity = req.body
    const cli = this.createTableClient(req.params.name)
    this.debuglog(req, 'save entity', entity)
    await cli.upsertEntity(entity)
    this.debuglog(req, 'save entity ok', entity)
    res.json({ ok: entity })
  }

  public deleteEntity = async (req: Request, res: Response) => {
    this.debuglog(req, 'req', 'deleteEntity')
    const pk = req.params.pk
    const rk = req.params.rk
    const cli = this.createTableClient(req.params.name)
    this.debuglog(req, 'delete', { pk: pk, rk: rk })
    await cli.deleteEntity(pk, rk)
    this.debuglog(req, 'delete ok', { pk: pk, rk: rk })
    res.json({ ok: { pk: pk, rk: rk } })
  }

}

export default new Tables()
