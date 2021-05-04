export const Id = (i => () => i++)(0)

export class Timer {
  constructor(callback, delay, notifyItem) {
    this.callback = callback
    this.remaining = delay
    this.notifyItem = notifyItem
    this.resume()
  }

  resume() {
    this.start = Date.now()
    clearTimeout(this.notifyItem.timer)
    this.notifyItem.timer = setTimeout(this.callback, this.remaining)
  }
}
