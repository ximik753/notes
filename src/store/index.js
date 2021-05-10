import auth from './modules/auth'
import notes from './modules/notes'
import note from './modules/note'
import {createStore} from 'vuex'

export default createStore({
  modules: {
    auth, notes, note
  }
})
