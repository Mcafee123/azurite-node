import app from './App'
import config from './config'

const port = process.env.PORT || config.port

app.listen(port, () => {
  return console.log(`server is listening on ${port}`)
})