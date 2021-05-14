import Http from './Http'

export default function(url) {
  const abortController = new AbortController()

  const request = async() => {
    return await Http.get({
      url,
      cancel: abortController.signal,
      isAuth: true
    })
  }

  const abort = () => {
    abortController.abort()
  }

  return {request, abort}
}
