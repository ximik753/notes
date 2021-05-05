export default {
  namespaced: true,
  state: {
    notes: [
      {
        title: 'Test',
        lastUpdate: Date.now(),
        shortText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, quod.',
        data: [{type: 'input', value: '1'}],
        id: 1
      }
    ]
  },
  getters: {
    getNoteById(state) {
      return id => {
        return state.notes.find(note => note.id === +id)
      }
    }
  }
}
