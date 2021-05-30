import store from '../../store'
import {parseJwt} from '../index'

export function isCorrectToken(token) {
  const data = parseJwt(token)
  return (data.exp - 60) > (Date.now() / 1000)
}

export async function updateRefreshToken() {
  const refreshToken = store.state.auth.refreshToken
  if (isCorrectToken(refreshToken)) {
    const token = await store.dispatch('auth/refreshTokens')
    if (token) {
      return token
    }
    return null
  } else {
    await store.dispatch('auth/logout')
    return null
  }
}
