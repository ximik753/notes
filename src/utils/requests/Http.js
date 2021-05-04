import {objToQueryString} from '../index'
import {isCorrectToken, updateRefreshToken} from './requestHelpers'
import store from '../../store'

export default class {
  static baseUrl = 'http://localhost:3000/api'

  static async _request({url, isAuth = false, query, body, method = 'GET'}) {
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

    if (isAuth) {
      const token = store.state['auth/token']
      if (isCorrectToken(token)) {
        headers.authorization = `Bearer ${store.state['auth/token']}`
      } else {
        const token = updateRefreshToken()
        if (token) {
          headers.authorization = `Bearer ${token}`
        } else {
          return null
        }
      }
    }

    const request = await fetch(`${this.baseUrl}${url}`, {
      headers,
      method,
      body
    })
    const json = await request.json()

    if (json.response) {
      return json.response
    }
    throw new Error(json.error.message)
  }

  static async get({url, query, isAuth}) {
    return await this._request({url, query, isAuth})
  }

  static async post({url, query, isAuth, body}) {
    return await this._request({
      url,
      query,
      isAuth,
      body,
      method: 'POST'
    })
  }
}
