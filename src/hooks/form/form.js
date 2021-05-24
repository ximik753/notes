import {computed, provide, ref} from 'vue'

export function useForm() {
  const fields = ref([])
  const isSubmitting = ref(false)

  function registerField(field) {
    fields.value.push(field)
  }

  function unRegisterField(field) {
    fields.value.filter(f => field.name !== f.name)
  }

  const formData = computed(() => {
    return fields.value.reduce((obj, field) => {
      obj[field.name] = field.value
      return obj
    }, {})
  })

  function isFormValid() {
    return fields.value.every(({error}) => {
      return error === null
    })
  }

  function validate() {
    return new Promise(resolve => {
      fields.value.forEach(({validate, value}) => {
        validate(value)
      })
      resolve(isFormValid())
    })
  }

  function setTouched() {
    fields.value = [...fields.value].map(field => {
      field.touched = true
      return field
    })
  }

  const submitForm = fn => {
    return e => {
      if (e instanceof Event) {
        e.preventDefault()
      }
      setTouched()
      isSubmitting.value = true
      validate()
        .then(result => {
          if (result) {
            return fn(formData.value)
          }
        })
        .then(
          () => {
            isSubmitting.value = false
          },
          () => {
            isSubmitting.value = false
          }
        )
    }
  }

  const formCtx = {
    register: registerField,
    unregister: unRegisterField
  }
  provide('vee-validate-form', formCtx)

  return {
    submitForm,
    isSubmitting
  }
}
