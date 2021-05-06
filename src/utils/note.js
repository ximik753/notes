export function createTemplateNote() {
  return {
    id: Date.now(),
    title: 'Без названия',
    lastUpdate: Date.now(),
    shortText: '',
    data: [
      {type: 'input', value: ''}
    ]
  }
}
