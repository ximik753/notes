import {storage} from '../../utils'
import {notify} from '../../plugins/notification/notify'
import {isCorrectToken} from '../../utils/requests/requestHelpers'
import Http from '../../utils/requests/Http'
import router from '../../router'

let token = storage('auth')?.token
token = token && isCorrectToken(token) ? token : null

export default {
  namespaced: true,
  state: {
    token,
    refreshToken: storage('auth')?.refreshToken
  },
  actions: {
    async register({commit, dispatch}, body) {
      try {
        const data = await Http.post({
          url: '/auth/register',
          body
        })

        if (data) {
          await dispatch('login', body)
        }
      } catch (e) {
        notify({
          title: 'Ошибка!',
          text: e.message,
          type: 'danger'
        })
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
        notify({
          title: 'Ошибка!',
          text: e.message,
          type: 'danger'
        })
      }
    },
    async refreshTokens({commit}, token) {
      const tokens = await Http.post({
        url: '/auth/refresh-token', body: {token}
      })
      commit('setTokens', tokens)
      return tokens
    },
    async logout({commit}) {
      commit('removeToken')
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
