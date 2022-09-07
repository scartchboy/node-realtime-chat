const express = require('express')
const admin = require('firebase-admin')

const bodyParser = require('body-parser')
const serviceAccount = require('./firebase-service-account.json')
const routes = require('./src/v1/routes/index')
const app = express()

const server = app.listen(2000, () => console.log('connected to server server'))
const io = require('socket.io')(server)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

io.on('connection', (socket) => {
  console.log('connected successfully', socket.id)
})

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/v1', routes)
