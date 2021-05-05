<template>
  <div class="p-5" v-if="$route.query.id && note">
    <component
      v-for="(component, index) in note.data"
      :key="component.value"
      :is="componentsName[index]"
      v-bind="{data: component.value}"
    ></component>
  </div>
  <div v-else class="position-absolute empty-container">
    <img class="logo" src="../../assets/images/note.png" alt="logo">
    <p class="empty-text">Выберите заметку или создате новую</p>
  </div>
</template>

<script>
import AppContentInput from './blocksContent/AppContentInput'

export default {
  name: 'AppNoteContainer',
  components: {AppContentInput},
  data() {
    return {
      note: null
    }
  },
  mounted() {
    this.note = this.$store.getters['notes/getNoteById'](this.$route.query.id)
  },
  computed: {
    componentsName() {
      return this.note.data.map(item => `app-content-${item.type}`)
    }
  }
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
