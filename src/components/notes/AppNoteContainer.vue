<template>
  <div class="position-absolute empty-container">
    <img class="logo" src="../../assets/images/note.png" alt="logo">
    <p class="empty-text">Выберите заметку или создате новую</p>
  </div>
</template>

<script>
export default {
  name: 'AppNoteContainer'
}
</script>

<style scoped>
.empty-container {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  text-align: center;
}
</style>
