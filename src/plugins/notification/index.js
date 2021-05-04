import NotificationContainer from './components/NotificationContainer'
import {notify} from './notify'
import './components/style.scss'

export default {
  install(app) {
    app.component(NotificationContainer)

    app.config.globalProperties.$notification = notify
  }
}
