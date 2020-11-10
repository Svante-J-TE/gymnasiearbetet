const express = require('express')
const dBModule = require('./dBModule')
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
}) 