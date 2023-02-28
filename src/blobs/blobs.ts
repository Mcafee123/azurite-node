import { NextFunction, Request, Response } from 'express'
import { BlobServiceClient } from "@azure/storage-blob"
import formidable from "formidable"
import config from '../config'

class Blobs {

  private connstring
  constructor() {
    this.connstring = process.env.CONNSTRING || config.connstring
  }

  public listBlobs = async (req: Request, res: Response) => {
    const containername = req.params.containername
    try {
      const blobServiceClient = BlobServiceClient.fromConnectionString(this.connstring)
      const containerClient = blobServiceClient.getContainerClient(containername)

      const exists = await containerClient.exists()
      if (!exists) {
        res.status(404).send(`container ${containername} not found`)
        return
      }

      const blobIterator = await containerClient.listBlobsFlat()
      const blobs = []
      for await (const _blob of blobIterator) {
        blobs.push(_blob)
      }
      res.json(blobs)

    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  }

  public upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const containername = req.params.containername
      const fieldsAndFiles = await this.readForm(req)
      const fields = fieldsAndFiles[0]
      const files = fieldsAndFiles[1]

      const blobServiceClient = BlobServiceClient.fromConnectionString(this.connstring)
      const containerClient = blobServiceClient.getContainerClient(containername)
      // create container if not exists
      const createContainerResponse = await containerClient.createIfNotExists()
      var i = 1
      for (const f of Object.keys(files)) {
        const blobName = fields[`filepath_${i}`].toString()
        // Get a block blob client
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        console.log('\nUploading to Azure storage as blob:\n\t', blobName);
        // Upload data to the blob
        const tempFilePath = (files[f] as any).filepath
        const mimeType = (files[f] as any).mimetype
        const uploadBlobResponse = await blockBlobClient.uploadFile(tempFilePath, {
          blobHTTPHeaders: {
              blobContentType: mimeType,
          },
        });
        console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
        i++
      }
      res.json({ fields, files })
    }
    catch (e) {
      console.log(e)
      res.status(500).send(e);
    }
  }

  public uploadText = async (req: Request, res: Response) => {

    const containername = req.params.containername
    const file = req.params.file
    const contents = req.body.contents

    console.log('upload file', file, req.body)

    try {

      const blobServiceClient = BlobServiceClient.fromConnectionString(this.connstring)
      const containerClient = blobServiceClient.getContainerClient(containername)

      // create container if not exists
      const createContainerResponse = await containerClient.createIfNotExists()
      console.log('createContainerResponse: ', createContainerResponse._response.status)

      // upload
      const blockBlobClient = containerClient.getBlockBlobClient(file);
      const uploadBlobResponse = await blockBlobClient.upload(contents, contents.length);
      if (uploadBlobResponse._response.status !== 201) {
        throw new Error(
          `Error uploading document ${blockBlobClient.name} to container ${blockBlobClient.containerName}`
        );
      }
      console.log('uploadBlobResponse: ', uploadBlobResponse._response.status)
      res.json({ ok: `${containername}/${file}` })

    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  }

  private readForm = async (req: Request) => {
    return new Promise<[fields: formidable.Fields, files: formidable.Files]>((resolve, reject) => {
      const form = new formidable.IncomingForm()
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.log(err)
          reject(err)
          return
        }
        resolve([fields, files])
      })
    })
  }
}

export default new Blobs()