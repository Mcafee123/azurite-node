# Node API for Azurite

## Table Storage

### Tables

* GET: /tables -> Array
* PUT: /tables/:name -> { ok: name }
* DELETE: /tables/:name -> { deleted: name }

### Entities

* GET: /table/:name -> Array
* GET: /table/:name/:pk/:rk -> object
* PUT: object (body) -> /table/:name -> { ok: entity }
* DELETE: /table/:name/:pk/:rk -> { ok: { pk: pk, rk: rk } }

## Blob Storage

* GET: /blobs/:containername -> Array
* PUT: string (body) -> /blobs/:containername/:file -> { ok: `${containername}/${file}` }
* POST: FormData -> /blobs/:containername -> { fields, files } (look at /test/blobs.spec.ts in "blobs/can create blobs" for client side implementation)
