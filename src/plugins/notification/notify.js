import events from './events'

export const notify = params => {
  events.emit('add', params)
}
