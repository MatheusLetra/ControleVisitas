const express = require('express')
const router = express.Router()

const CadastrosController = require('../controllers/cadastros')

router.get('/', (req, res) => {
  res.status(200).send({ message: 'Bem vindo a API do controle de visitas' })
})

router.get('/cadastros', CadastrosController.buscarTodos)
router.get('/cadastros/:codigo', CadastrosController.buscarPorCodigo)
router.post('/cadastros', CadastrosController.criarNovo)
router.put('/cadastros/:codigo', CadastrosController.atualizarCadastro)
router.delete('/cadastros/:codigo', CadastrosController.excluirCadastro)


module.exports = router