import router from '../../router'
import Http from '../../utils/requests/Http'
import {createTemplateNote} from '../../utils/note'

export default {
  namespaced: true,
  state: {
    notes: null,
    creating: false
  },
  actions: {
    async createNote(ctx) {
      const {id} = await Http.post({
        url: '/note',
        isAuth: true
      })
      const note = createTemplateNote(id)
      ctx.commit('addNote', note)
      await router.push({name: 'Home', query: {id: note.id, new: 'true'}})
    },
    async fetchNotes(ctx) {
      ctx.commit('setCreatingStatus', true)
      const notes = await Http.get({
        url: '/note',
        isAuth: true
      })
      ctx.commit('setCreatingStatus', false)
      ctx.commit('initNotes', notes)
    }
  },
  mutations: {
    addNote(state, note) {
      state.notes = [note, ...state.notes]
    },
    initNotes(state, notes) {
      state.notes = notes
    },
    setCreatingStatus(state, status) {
      state.creating = status
    },
    changeTitle(state, {id, title}) {
      const note = state.notes.find(note => note.id === id)
      note.title = title
    }
  }
}
