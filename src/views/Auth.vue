<template>
  <div class="container min-vh-100 d-flex align-items-center justify-contents-center">
    <div class="auth">
      <div class="auth__tabs row mb-4">
        <div
          class="auth__tab col-6 text-center p-3"
          :class="{active: $route.query.type !== 'register' }"
          @click="changePage('login')"
        >Войти</div>
        <div
          class="auth__tab col-6 text-center p-3"
          :class="{active: $route.query.type === 'register'}"
          @click="changePage('register')"
        >Регистрация</div>
      </div>
      <div class="auth__container">
        <Component
          :is="renderComponent"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'

export default {
  name: 'Auth',
  components: {Register, Login},
  computed: {
    renderComponent() {
      if (this.$route.query.type === 'register') {
        return 'register'
      }
      return 'login'
    }
  },
  methods: {
    changePage(page) {
      this.$router.push(`/auth?type=${page}`)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/vareables";

.container {
  width: 400px;
}
.auth {
  border: 1px solid $gray-400;
  border-radius: 5px;

  &__tabs {
    border-bottom: 1px solid $gray-400;
  }

  &__tab {
    cursor: pointer;
    color: $gray-600;
    font-weight: 500;

    &.active {
      border-bottom: 1px solid $blue;
    }
  }

  &__container {
    padding: 10px 60px 40px 60px;
  }
}
</style>
