class Events {
  listeners = {}

  on(eventName, cb) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(cb)
  }

  emit(eventName, data) {
    if (Array.isArray(this.listeners[eventName])) {
      this.listeners[eventName].forEach(subscriber => subscriber(data))
    }
  }
}

export default new Events()
