export default class {
  validators = []

  required(msg) {
    const test = msg => {
      return val => {
        if (val) {
          return true
        }
        return msg || 'Данное поле является обязательным'
      }
    }

    this.validators.push(test(msg))
    return this
  }
}
