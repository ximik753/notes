import Http from '../../utils/requests/Http'
import router from '../../router'
import {createTemplateNote, moveNoteToTop} from '../../utils/note'

export default {
  namespaced: true,
  state: {
    notes: null,
    creating: false,
    removing: false
  },
  actions: {
    async createNote(ctx) {
      ctx.commit('setCreatingStatus', true)
      ctx.commit('note/creatingNote', null, {root: true})
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
      ctx.commit('initNotes', notes)
    },
    async removeNote({commit, state}, id) {
      commit('setRemovingStatus', true)
      try {
        await Http.delete({
          url: `/note/${id}`,
          isAuth: true
        })
        commit('removeNoteById', id)
      } catch (e) {}
    },
    updateNotesList({commit}, payload) {
      if (payload.title) {
        commit('changeTitle', {id: payload.id, title: payload.title})
      }
      commit('updateNote', payload.id)
    }
  },
  mutations: {
    addNote(state, note) {
      state.notes = [note, ...state.notes]
      state.creating = false
    },
    initNotes(state, notes) {
      state.notes = notes
      state.creating = false
    },
    setCreatingStatus(state, status) {
      state.creating = status
    },
    changeTitle(state, {id, title}) {
      const note = state.notes.find(note => note.id === id)
      note.title = title
    },
    updateNote(state, noteId) {
      const note = state.notes.find(note => note.id === noteId)
      note.last_update = new Date(Date.now()).toISOString()
      state.notes = [...moveNoteToTop(note, [...state.notes])]
    },
    removeNoteById(state, id) {
      state.notes = state.notes.filter(n => n.id !== id)
      state.removing = false
    },
    setRemovingStatus(state, status) {
      state.removing = status
    },
    clearNotes(state) {
      state.notes = null
    }
  },
  getters: {
    getNoteById(state) {
      return id => {
        return state.notes?.find(note => note.id === id)
      }
    }
  }
}
