export const DEFAULT_CHANGE_WAIT = 500

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

export function createTodoItemBlock() {
  return {value: '', done: false, id: Date.now()}
}

export function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function changeNotePosition(note, array, newPos = 0) {
  const idx = array.indexOf(note)
  array.splice(idx, 1)
  array.splice(newPos, 0, note)
  return array
}

export function moveNoteToTop(note, array) {
  return changeNotePosition(note, array)
}
