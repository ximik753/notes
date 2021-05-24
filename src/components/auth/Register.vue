<template>
  <form @submit="onSubmit">
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
    <form-control
      id="replyPassword"
      type="password"
      label="Повторный пароль"
      :blur-handler="rpBlur"
      :error="rpError"
      v-model:value="replyPassword"
    />
    <button class="btn btn-primary w-100" :disabled="isSubmitting">
      <app-spinner small v-if="isSubmitting"></app-spinner>
      Зарегистрироваться
    </button>
  </form>
</template>

<script>
import AppSpinner from '../UI/AppSpinner'
import FormControl from '../UI/FormControl'
import validators from '../../utils/validators'
import {useField} from '../../hooks/form/field'
import {useForm} from '../../hooks/form/form'
import {useStore} from 'vuex'

export default {
  name: 'Register',
  components: {AppSpinner, FormControl},
  setup() {
    const {submitForm, isSubmitting} = useForm()
    const {value: login, error: lError, blur: lBlur} = useField(
      'login',
      validators.string().required().minLength(5).maxLength(10))
    const {value: password, error: pError, blur: pBlur} = useField(
      'password',
      validators.string().required().minLength(6).maxLength(50))
    const {value: replyPassword, error: rpError, blur: rpBlur} = useField(
      'replyPassword',
      validators.string().required().isEqual(password, 'Пароли не совпадают'))
    const store = useStore()

    const onSubmit = submitForm(async values => {
      await store.dispatch('auth/register', values)
    })

    return {
      login,
      lError,
      lBlur,
      password,
      pError,
      pBlur,
      replyPassword,
      rpError,
      rpBlur,
      onSubmit,
      isSubmitting
    }
  }
}
</script>
