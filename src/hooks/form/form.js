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

  const submitForm = async fn => {
    isSubmitting.value = true
    await fn(formData.value)
    isSubmitting.value = false
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
