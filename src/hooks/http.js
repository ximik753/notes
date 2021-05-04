import Http from '../utils/requests/Http'

export function useHttp() {
  const get = async({url, query, isAuth}) => {
    return await Http.get({url, query, isAuth})
  }

  const post = async({url, query, isAuth, body}) => {
    return await Http.post({
      url,
      query,
      isAuth,
      body,
      method: 'POST'
    })
  }

  return {get, post}
}
