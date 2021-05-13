import Http from '../utils/requests/Http'

export function useHttp() {
  const get = async({url, query, isAuth, cancel}) => {
    return await Http.get({
      url,
      query,
      isAuth,
      cancel
    })
  }

  const post = async({url, query, isAuth, body, cancel}) => {
    return await Http.post({
      url,
      query,
      isAuth,
      body,
      method: 'POST',
      cancel
    })
  }

  return {get, post}
}
