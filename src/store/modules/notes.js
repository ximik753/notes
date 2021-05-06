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
          {type: 'input', value: '1'},
          {type: 'todo', value: [{value: 'test', done: false}, {value: 'test2', done: true}]}
        ],
        id: 1
      }
    ]
  },
  mutations: {
    createNote(state) {
      state.notes = [createTemplateNote(), ...state.notes]
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
