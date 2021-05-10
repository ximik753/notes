export function createTemplateNote(id) {
  return {
    id: id,
    title: 'Без названия',
    last_update: Date.now(),
    data: [createInputBlock()]
  }
}

export function createInputBlock() {
  return {type: 'input', data: '', id: generateId()}
}

export function createTodoBlock() {
  return {type: 'todo', id: generateId(), data: []}
}

export function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function timeParse(time) {
  time = new Date(time)
  return {
    hours: getCorrectTime(time.getHours()),
    minutes: getCorrectTime(time.getMinutes())
  }
}

export function getCorrectTime(time) {
  return time < 10 ? `0${time}` : time
}
