<template>
  <div class="p-2 border-bottom note-container">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h5>Заголовок</h5>
      <time>12:00</time>
    </div>
    <p>текмст1321323 32 1321 3213 213 21 3123 21</p>
  </div>
</template>

<script>
export default {
  name: 'AppNote'
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/vareables";

h5 {
 margin: 0;
}
p {
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
  margin: 0;
}
.note-container {
  cursor: pointer;
  transition: background-color;
  &:hover {
    background-color: $gray-100;
  }
}
</style>
