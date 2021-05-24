import Http from '../../utils/requests/Http'
import router from '../../router'
import {storage} from '../../utils'
import {danger} from '../../utils/notifications'

export default {
  namespaced: true,
  state: {
    token: storage('auth')?.token,
    refreshToken: storage('auth')?.refreshToken
  },
  actions: {
    async register({commit, dispatch}, body) {
      try {
        await Http.post({
          url: '/auth/register',
          body
        })
        await dispatch('login', body)
      } catch (e) {
        danger(e.message)
      }
    },
    async login({commit}, body) {
      try {
        const tokens = await Http.post({
          url: '/auth/login', body
        })
        commit('setTokens', tokens)
        await router.push('/')
      } catch (e) {
        danger(e.message)
      }
    },
    async refreshTokens({commit, state}) {
      const tokens = await Http.post({
        url: '/auth/token-refresh', body: {token: state.refreshToken}
      })
      commit('setTokens', tokens)
      return tokens.token
    },
    async logout({commit}) {
      commit('removeToken')
      commit('note/clearNote', null, {root: true})
      commit('notes/clearNotes', null, {root: true})
      await router.push('/auth')
    }
  },
  mutations: {
    setTokens(state, {token, refreshToken}) {
      state.token = token
      state.refreshToken = refreshToken
      storage('auth', {token, refreshToken})
    },
    removeToken(state) {
      state.token = null
      state.refreshToken = null
      localStorage.clear()
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token
    }
  }
}
