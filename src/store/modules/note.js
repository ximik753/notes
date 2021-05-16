import Http from '../../utils/requests/Http'
import {createInputBlock, createTodoBlock} from '../../utils/note'
import createCancelRequest from '../../utils/requests/cancelRequest'

export default {
  namespaced: true,
  state: {
    note: null,
    updating: false,
    fetching: false,
    fetchingCancel: null
  },
  actions: {
    async fetch({state, commit}, id) {
      const {request, abort} = createCancelRequest(`/note/${id}`)
      if (state.fetching) {
        state.fetchingCancel()
      }

      commit('setFetching', {status: true, abort})
      try {
        const note = await request()
        commit('setNote', note)
        if (!note.data) {
          commit('setDefaultData')
        }
        commit('setFetching', {status: false})
      } catch (e) {}
    },
    async changeTitle(ctx, title) {
      if (ctx.state.note.title !== title && title.length <= 15) {
        ctx.commit('setTitle', title)
        ctx.dispatch('notes/updateNotesList', {title, id: ctx.state.note.id}, {root: true})
        ctx.commit('changeLastTimeUpdate')
        await Http.patch({
          url: `/note/${ctx.state.note.id}`,
          body: {title},
          isAuth: true
        })
        ctx.commit('setUpdating', false)
      }
    },
    async patchData(ctx, {nodeId, value}) {
      const notes = ctx.getters.getData.map(n => {
        if (n.id === nodeId) {
          n.data = value
        }
        return n
      })

      ctx.dispatch('notes/updateNotesList', {id: ctx.state.note.id}, {root: true})
      ctx.commit('setData', notes)
      ctx.commit('changeLastTimeUpdate')
      await Http.patch({
        url: `/note/${ctx.state.note.id}`,
        body: {data: notes},
        isAuth: true
      })
      ctx.commit('setUpdating', false)
    }
  },
  mutations: {
    setNote(state, note) {
      state.note = note
    },
    setTitle(state, title) {
      state.note.title = title
      state.updating = true
    },
    setUpdating(state, status) {
      state.updating = status
    },
    setDefaultData(state) {
      state.note.data = [createInputBlock()]
    },
    setData(state, data) {
      state.note.data = data
      state.updating = true
    },
    changeLastTimeUpdate(state) {
      state.note.last_update = new Date(Date.now()).toISOString()
    },
    addComponent(state, {potion, type}) {
      state.note.data.splice(potion, 0, type === 'input' ? createInputBlock() : createTodoBlock())
    },
    setFetching(state, payload) {
      state.fetching = payload.status
      if (payload.status) {
        state.fetchingCancel = payload.abort
      }
    }
  },
  getters: {
    getId(state) {
      return state.note?.id
    },
    getTitle(state) {
      return state.note.title
    },
    getData(state) {
      return state.note?.data
    },
    getDateUpdate(state) {
      return state.note.last_update
    }
  }
}
