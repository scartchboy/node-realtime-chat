require('dotenv').config()
const express = require('express')
const admin = require('firebase-admin')

const bodyParser = require('body-parser')
const serviceAccount = require('./firebase-service-account.json')
const routes = require('./src/v1/routes/index')
const app = express()
var port = process.env.PORT || 8000
var hostname = process.env.HOSTNAME || '0.0.0.0'

const server = app.listen(port, hostname, () =>
  console.log('connected to server server'),
)
const io = require('socket.io')(server)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

io.on('connection', (socket) => {
  console.log('connected successfully', socket.id)
  socket.on('message', (data) => {
    io.emit('messaging', data)
  })
})

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/check', (req, res, next) => {
  res.send('connected to server')
})
app.use('/v1', routes)
