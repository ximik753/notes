<template>
  <header class="col-12 position-fixed">
    <div class="container d-flex justify-content-between pt-3 pb-3">
      <div class="row align-items-center">
        <img class="logo" src="../../assets/images/notes/logo.png" alt="logo">
        <span class="ml-2 logo__color fw-bold">Заметки</span>
      </div>
      <button class="btn btn-danger align-self-center" @click="$store.dispatch('auth/logout')">Выйти</button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style scoped lang="scss" >
@import "../../assets/scss/vareables";

header {
  box-shadow: 0 2px 5px 2px rgba(60, 64, 67, .15);
  background-color: $white;
  z-index: 100;
}
.logo {
  width: 45px;

  &__color {
    color: #FFF200;
    font-size: 16px;
  }
}
</style>
