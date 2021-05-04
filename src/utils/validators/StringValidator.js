import Validator from './Validator'

export default class extends Validator {
  minLength(length = 1, msg) {
    const test = (length, msg) => {
      return val => {
        if (val.length >= length) {
          return true
        }
        return msg || `Данное поле должно быть больше ${length} символов`
      }
    }

    this.validators.push(test(length, msg))
    return this
  }

  maxLength(length = 1, msg) {
    const test = (length, msg) => {
      return val => {
        if (val.length <= length) {
          return true
        }
        return msg || `Данное поле должно быть меньше ${length} символов`
      }
    }

    this.validators.push(test(length, msg))
    return this
  }

  isEqual(target, msg) {
    const test = (target, msg) => {
      return val => {
        if (val === target.value) {
          return true
        }
        return msg || 'Данные поля имеют разные значения'
      }
    }

    this.validators.push(test(target, msg))
    return this
  }
}
