import Http from '../../utils/requests/Http'
import {createInputBlock, createTodoBlock} from '../../utils/note'

export default {
  namespaced: true,
  state: {
    note: null,
    updating: false,
    fetching: false
  },
  actions: {
    async fetch(ctx, id) {
      ctx.commit('setFetching', true)
      const note = await Http.get({
        url: `/note/${id}`,
        isAuth: true
      })
      ctx.commit('setNote', note)

      if (!note.data) {
        ctx.commit('setDefaultData')
      }
      ctx.commit('setFetching', false)
    },
    async changeTitle(ctx, title) {
      if (ctx.state.note.title !== title && title.length <= 15) {
        ctx.commit('setTitle', title)
        ctx.commit('setUpdating', true)
        await Http.patch({
          url: `/note/${ctx.state.note.id}`,
          body: {title},
          isAuth: true
        })
        ctx.commit('setUpdating', false)
        ctx.commit('notes/changeTitle', {title, id: ctx.state.note.id}, {root: true})
      } else {
        ctx.commit('setTitle', title)
      }
    },
    async patchData(ctx, {nodeId, value}) {
      const notes = ctx.getters.getData.map(n => {
        if (n.id === nodeId) {
          n.data = value
        }
        return n
      })

      ctx.commit('setData', notes)
      ctx.commit('setUpdating', true)
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
    },
    setUpdating(state, status) {
      state.updating = status
    },
    setDefaultData(state) {
      state.note.data = [createInputBlock()]
    },
    setData(state, data) {
      state.note.data = data
    },
    addComponent(state, {potion, type}) {
      state.note.data.splice(potion, 0, type === 'input' ? createInputBlock() : createTodoBlock())
    },
    setFetching(state, status) {
      state.fetching = status
    }
  },
  getters: {
    getTitle(state) {
      return state.note.title
    },
    getData(state) {
      return state.note?.data
    }
  }
}
