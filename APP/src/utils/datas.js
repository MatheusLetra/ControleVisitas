import moment from 'moment-timezone'

export function retornarDataAtual() {
  return moment().locale('br').format('yyyy-MM-DD')
}

export function formatarDataEnviar(data) {
  return moment(data).locale('br').format('MM-DD-yyyy')
}

export function formatarDataVisualizar(data) {
  return moment(data).locale('br').format('DD/MM/yyyy')
}