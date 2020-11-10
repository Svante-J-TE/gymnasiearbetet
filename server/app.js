const express = require('express')
const dBModule = require('./dBModule')
const UserModel = require('./UserModel')
const MessageModel = require('./MessageModel')
const bcryptjs = require('bcryptjs')
const app = express()
const port = 3000
dBModule.connectToMongoose('test')

const clientDir = __dirname + "\\client\\"

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(clientDir))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('pages/loginRegister.ejs')
})

app.post('/createUser', async (req, res) => {
  const hashedPassword = await bcryptjs.hash(req.body.password, 10)
  dBModule.saveToMongoose(UserModel.createUser(req.body.username, hashedPassword))
  res.render('pages/index.ejs')
})

app.post('/createPost', async (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
}) 