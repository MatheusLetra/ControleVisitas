import moment from 'moment-timezone'

export function retornarDataAtual() {
  return moment().locale('br').format('yyyy-MM-DD')
}