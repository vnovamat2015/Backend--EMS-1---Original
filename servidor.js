const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const port = 2000
app.use(bodyParser.json())
app.use(cors())


const controller = require('./controller.js');

app.use('/',controller)

app.listen(port, () => {

      console.log("O servidor rodando porta 2000: http://localhost:2000",)
       });
