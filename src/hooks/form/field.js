import {onBeforeUnmount, ref, watch} from 'vue'
import {injectWithSelf, FormContext} from '../../utils'

export function useField(name, rules) {
  const form = injectWithSelf(FormContext)
  const value = ref('')
  const error = ref(null)
  const touched = ref(false)

  const validationHandler = val => {
    for (const validator of rules.validators) {
      const resValidation = validator(val)
      if (resValidation !== true) {
        error.value = resValidation
        break
      }
    }
  }

  const validation = ([val, touched]) => {
    if (touched) {
      error.value = null
      validationHandler(val)
    }
  }

  const field = {
    error,
    name,
    value,
    touched,
    validate: validationHandler
  }
  form.register(field)
  onBeforeUnmount(() => {
    form.unregister(field)
  })

  watch([value, touched], validation)

  return {
    value,
    error,
    blur: () => touched.value = true
  }
}
