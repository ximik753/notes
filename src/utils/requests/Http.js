import store from '../../store'
import {objToQueryString} from '../index'
import {isCorrectToken, updateRefreshToken} from './requestHelpers'

export default class {
  static baseUrl = 'http://localhost:3000/api'

  static async _request({url, isAuth = false, query, body, method = 'GET', cancel}) {
    const headers = {}
    if (query) {
      if (typeof query === 'string') {
        url = `${url}?${query}`
      } else {
        query = objToQueryString(query)
        url = `${url}?${query}`
      }
    }

    if (body) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(body)
    }

    try {
      if (isAuth) {
        const token = store.state.auth.token
        if (isCorrectToken(token)) {
          headers.authorization = `Bearer ${token}`
        } else {
          const updatedToken = await updateRefreshToken()
          if (updatedToken) {
            headers.authorization = `Bearer ${updatedToken}`
          } else {
            return null
          }
        }
      }

      const request = await fetch(`${this.baseUrl}${url}`, {
        headers,
        method,
        body,
        signal: cancel
      })
      const json = await request.json()

      if (json.response) {
        return json.response
      }
      throw new Error(json.error.message)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static async get({url, query, isAuth, cancel}) {
    return await this._request({
      url,
      query,
      isAuth,
      cancel
    })
  }

  static async post({url, query, isAuth, body, cancel}) {
    return await this._request({
      url,
      query,
      isAuth,
      body,
      method: 'POST',
      cancel
    })
  }

  static async patch({url, body, isAuth, cancel}) {
    return await this._request({
      url,
      body,
      isAuth,
      method: 'PATCH',
      cancel
    })
  }
}
