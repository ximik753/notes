import {notify} from '../plugins/notification/notify'

export function danger(message, title = 'Ошибка!') {
  notify({
    title: title,
    text: message,
    type: 'danger'
  })
}
