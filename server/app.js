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
  res.render('pages/index.ejs')
})

app.get('/login', (req, res) => {
  res.render('pages/login.ejs')
})

app.get('/register', (req, res) => {
  res.render('pages/register.ejs')
})

app.post('/createUser', async (req, res) => {
  let usernameTaken = await dBModule.findInMongoose(UserModel, req.body.username)
  if(!usernameTaken){
    const hashedPassword = await bcryptjs.hash(req.body.password, 10)
    await dBModule.saveToMongoose(createUser(req.body.username, hashedPassword))
  }
  res.redirect('/login')
})

app.post('/login', async (req, res) =>{
  let username = await dBModule.findInMongoose(UserModel, req.body.username)
  if(username && bcryptjs.compare(req.body.password, username.password)){
    console.log("hejsan")
  }
  res.redirect('/')
  
})

app.post('/createPost', async (req, res) => {
  dBModule.saveToMongoose(MessageModel.createMessage("svante", req.body.title, req.body.message))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
}) 

function createUser(inName, inPassword){
    let user = new UserModel({
        name: inName,
        password: inPassword
    })
    return user;
}

function createMessage(inUser, inTitle, inMessage){
    let message = new MessagePost({
        user: inUser,
        title: inTitle,
        message: inMessage
    })
    return message;
}