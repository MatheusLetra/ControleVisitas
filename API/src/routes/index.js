const express = require('express')
const router = express.Router()

const CadastrosController = require('../controllers/cadastros')
const UsuariosController = require('../controllers/usuarios')

router.get('/', (req, res) => {
  res.status(200).send({ message: 'Bem vindo a API do controle de visitas' })
})


// ************* CADASTROS *************************
router.get('/cadastros', CadastrosController.buscarTodos)
router.get('/cadastros/:codigo', CadastrosController.buscarPorCodigo)
router.post('/cadastros', CadastrosController.criarNovo)
router.put('/cadastros/:codigo', CadastrosController.atualizarCadastro)
router.delete('/cadastros/:codigo', CadastrosController.excluirCadastro)


// ************* USUARIOS *************************
router.get('/usuarios', UsuariosController.buscarTodos)
router.get('/usuarios/:codigo', UsuariosController.buscarPorCodigo)
router.post('/usuarios', UsuariosController.criarNovo)
router.put('/usuarios/:codigo', UsuariosController.atualizarUsuario)
router.delete('/usuarios/:codigo', UsuariosController.excluirUsuario)



module.exports = router