import moment from 'moment'

export function parseTime(time) {
  if (!time) return '未定义'
  return `${time?.split("T")[0]}  ${time?.split("T")[1].slice(0, -5)}`
}

export function timestampToTime(timestamp) {
  if(!timestamp) return '未定义'
  return moment(timestamp).format('YYYY-MM-DD HH:MM:ss')
}