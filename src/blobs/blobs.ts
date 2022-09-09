import { Request, Response } from 'express'
import { BlobServiceClient } from "@azure/storage-blob"
import config from '../config'

class Blobs {

  private connstring
  constructor() {
    this.connstring = process.env.CONNSTRING || config.connstring
  }

  public uploadText = async (req: Request, res: Response) => {
    
    const containername = req.params.containername
    const file = req.params.file
    const contents = req.body.contents

    console.log('upload file', file)

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

}

export default new Blobs()