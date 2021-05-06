import {createTemplateNote} from '../../utils/note'

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
            value: '1'
          }
        ]
      }
    ]
  },
  mutations: {
    createNote(state) {
      state.notes = [createTemplateNote(), ...state.notes]
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
