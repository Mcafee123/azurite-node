import * as fs from "fs"
import * as path from "path"
import FormData from "form-data"

describe('blobs', () => {
  it('can create blobs', (done) => {
    console.log(__dirname)
    const normalizedPath = path.join(__dirname, "../../docker")
    console.log(normalizedPath)

    var form = new FormData()
    var i = 1
    fs.readdirSync(normalizedPath).forEach((file) => {
      const filepath = path.join(normalizedPath, "/", file)
      if (fs.lstatSync(filepath).isFile()) {
        console.log(file)
        const readStream = fs.createReadStream(filepath)
        form.append(`file_${i}`, file)
        form.append(`filepath_${i}`, `all/generic/08/${file}`)
        form.append(`filecontents_${i}`, readStream)
        i = i + 1
      }
    })
    form.submit('http://localhost:3000/blobs/formtemplates', async (err, res) => {
      if (err) {
        throw err
      }
      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        data = JSON.parse(data)
        // console.log(data)
        done()
      });
    })    
  })
})
