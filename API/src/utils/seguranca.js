const bcrypt = require('bcrypt')

const criptografarSenha = async (senha) => {
  var salt = await bcrypt.genSaltSync(10)
  var hash = await bcrypt.hashSync(senha, salt)

  return hash
}

const compararSenha = async (senha, hash) => {
  var retorno = await bcrypt.compareSync(senha, hash); // true || false
  return retorno
}

module.exports = { criptografarSenha, compararSenha }