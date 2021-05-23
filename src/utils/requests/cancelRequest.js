import Http from './Http'

export default function(url) {
  const abortController = new AbortController()
  const methodsWithBody = ['POST', 'PATCH', 'PUT']

  const request = async(method = 'GET', body = {}) => {
    const params = {
      url,
      method,
      cancel: abortController.signal,
      isAuth: true
    }

    if (methodsWithBody.includes(method)) {
      params.body = body
    }
    return await Http._request(params)
  }

  const abort = () => {
    abortController.abort()
  }

  return {request, abort}
}
