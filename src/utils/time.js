export function timeParse(time) {
  time = new Date(time)
  if (isToday(time)) {
    return getTime(time)
  } else if (isYesterday(time)) {
    return `Вчера в ${getDate(time)}`
  }
  return getDate(time)
}

export function getFullDate(date) {
  date = new Date(date)
  return `${getCorrectTime(date.getDate())} ${getMonthName(date.getMonth())} ${date.getFullYear()}г. ${getTime(date)}`
}

function getTime(date) {
  return `${getCorrectTime(date.getHours())}:${getCorrectTime(date.getMinutes())}`
}

function getDate(date) {
  return `${getCorrectTime(date.getDate())}.${getCorrectTime(date.getMonth() + 1)}.${getCorrectTime(date.getFullYear())}`
}

function getMonthName(id) {
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  return months[id]
}

function isToday(date) {
  return date.getDate() === new Date(Date.now()).getDate()
}

function isYesterday(date) {
  return date.getDate() === new Date(Date.now()).getDate() - 1
}

function getCorrectTime(time) {
  return time < 10 ? `0${time}` : time
}
