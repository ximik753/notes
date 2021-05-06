import {getCurrentInstance, inject} from 'vue'

export const FormContext = 'vee-validate-form'

export function injectWithSelf(symbol, def = undefined) {
  const vm = getCurrentInstance()
  // eslint-disable-next-line no-void
  return inject(symbol, (vm === null || vm === void 0 ? void 0 : vm.provides[symbol]) || def)
}

export function objToQueryString(obj) {
  return Object.entries(obj)
    .map(([key, value]) => {
      return `${key}=${value}`
    })
    .join('&')
}

export function storage(key, value) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  }
  return JSON.parse(localStorage.getItem(key))
}

export function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}

export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
