import {createTemplateNote} from '../../utils/note'
import router from '../../router'

export default {
  namespaced: true,
  state: {
    notes: [
      {
        id: 1,
        title: 'Test',
        lastUpdate: Date.now(),
        shortText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, quod.',
        data: [
          {
            id: Date.now(),
            type: 'input',
            value: ''
          }
        ]
      }
    ]
  },
  actions: {
    async createNote(ctx) {
      const note = createTemplateNote()
      ctx.commit('addNote', note)
      await router.push({name: 'Home', query: {id: note.id, new: 'true'}})
    }
  },
  mutations: {
    addNote(state, note) {
      state.notes = [note, ...state.notes]
    },
    changeTitle(state, {id, title}) {
      const note = state.notes.find(note => note.id === id)
      note.title = title
    },
    patchData(state, {noteId, nodeId, value}) {
      const node = state.notes
        .find(n => n.id === noteId).data
        .find(n => n.id === nodeId)
      node.value = value
    }
  },
  getters: {
    getNoteById(state) {
      return id => {
        return state.notes.find(note => note.id === +id)
      }
    }
  }
}
