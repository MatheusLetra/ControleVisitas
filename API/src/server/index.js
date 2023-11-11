const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const conexao = require('../config/conexao')
const ambiente = require('../config/ambiente')
const routes = require('../routes')

const server = express()
server.use(bodyParser.json({ limit: '500mb' }));
server.use(cors())
server.use(routes)

conexao.sync()
  .then(() => {
    server.listen(ambiente.PORT, () => {
      console.clear()
      console.log(`API rodando na porta ${ambiente.PORT}`)
    })
  })
  .catch(err => {
    console.log(err)
  })