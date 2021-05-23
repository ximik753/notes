import createCancelRequest from '../../utils/requests/cancelRequest'
import {changeNotePosition, createInputBlock, createTodoBlock} from '../../utils/note'

export default {
  namespaced: true,
  state: {
    note: null,
    updating: false,
    updatingCancel: null,
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
        await ctx.dispatch('sendData', {title})
      }
    },
    async patchData(ctx, {componentId, value}) {
      const components = ctx.getters.getData.map(n => {
        if (n.id === componentId) {
          n.data = value
        }
        return n
      })
      ctx.dispatch('notes/updateNotesList', {id: ctx.state.note.id}, {root: true})
      ctx.commit('setData', components)
      await ctx.dispatch('sendData', {data: components})
    },
    async changeComponents(ctx, {componentId, position}) {
      let data
      if (typeof position === 'number') {
        const component = ctx.getters.getData.find(c => c.id === componentId)
        data = [...changeNotePosition(component, [...ctx.getters.getData], position)]
      } else {
        data = ctx.getters.getData.filter(n => n.id !== componentId)
      }
      ctx.commit('setData', data)
      await ctx.dispatch('sendData', {data})
    },
    async sendData(ctx, data) {
      ctx.commit('changeLastTimeUpdate')
      const {request, abort} = createCancelRequest(`/note/${ctx.state.note.id}`)
      if (ctx.state.updating) {
        ctx.state.updatingCancel()
      }

      ctx.commit('setUpdatingCancel', abort)
      await request('PATCH', data)
      ctx.commit('setUpdating', false)
    }
  },
  mutations: {
    setNote(state, note) {
      state.note = note
    },
    setTitle(state, title) {
      state.note.title = title
    },
    setUpdating(state, status) {
      state.updating = status
    },
    setUpdatingCancel(state, cancel) {
      state.updatingCancel = cancel
      state.updating = true
    },
    setDefaultData(state) {
      state.note.data = [createInputBlock()]
    },
    setData(state, data) {
      state.note.data = [...data]
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
