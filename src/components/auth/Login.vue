<template>
  <form @submit.prevent="onSubmit">
    <form-control
      id="login"
      label="Логин"
      :error="lError"
      :blur-handler="lBlur"
      v-model:value="login"
    />
    <form-control
      id="password"
      type="password"
      label="Пароль"
      :error="pError"
      :blur-handler="pBlur"
      v-model:value="password"
    />
    <button class="btn btn-primary w-100" :disabled="isSubmitting">
      <app-spinner small v-if="isSubmitting"></app-spinner>
      Войти
    </button>
  </form>
</template>

<script>
import FormControl from '../UI/FormControl'
import validators from '../../utils/validators'
import {useForm} from '../../hooks/form/form'
import {useField} from '../../hooks/form/field'
import {useStore} from 'vuex'
import AppSpinner from '../UI/AppSpinner'

export default {
  name: 'Login',
  components: {AppSpinner, FormControl},
  setup() {
    const {submitForm, isSubmitting} = useForm()
    const {value: login, error: lError, blur: lBlur} = useField(
      'login',
      validators.string().required().minLength(5).maxLength(10))
    const {value: password, error: pError, blur: pBlur} = useField(
      'password',
      validators.string().required().minLength(6).maxLength(50))
    const store = useStore()

    const onSubmit = () => {
      submitForm(async values => {
        await store.dispatch('auth/login', values)
      })
    }

    return {
      login,
      lError,
      lBlur,
      password,
      pError,
      pBlur,
      onSubmit,
      isSubmitting
    }
  }
}
</script>
