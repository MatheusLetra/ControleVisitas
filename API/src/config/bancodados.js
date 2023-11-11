const bancodadosconfig = {
  host: 'localhost',
  port: 3306,
  database: 'controlevisitas',
  dialect: 'mysql',
  username: 'root',
  password: ''
}

module.exports = {
  bancodados: {
    ...bancodadosconfig
  }
}