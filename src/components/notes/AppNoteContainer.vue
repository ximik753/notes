<template>
  <div class="p-5" v-if="$route.query.id && note">
    <input class="form__control h4" v-model="title"/>
    <component
      v-for="(component, index) in note.data"
      :key="component.value"
      :is="componentsName[index]"
      @add-component="addComponent"
      v-bind="{data: component.value, componentId: index}"
    ></component>
  </div>
  <div v-else class="position-absolute empty-container">
    <img class="logo" src="../../assets/images/note.png" alt="logo">
    <p class="empty-text">Выберите заметку или создате новую</p>
  </div>
</template>

<script>
import AppContentInput from './blocksContent/AppContentInput'
import AppContentTodo from './blocksContent/AppContentTodo'

export default {
  name: 'AppNoteContainer',
  components: {AppContentInput, AppContentTodo},
  data() {
    return {
      note: null
    }
  },
  mounted() {
    this.loadNote()
  },
  watch: {
    '$route.query.id'() {
      this.loadNote()
    }
  },
  computed: {
    componentsName() {
      return this.note.data.map(item => `app-content-${item.type}`)
    }
  },
  methods: {
    addComponent(type, index) {
      this.note.data.splice(index, 0, {type, value: type === 'input' ? Date.now() : []})
    },
    loadNote() {
      this.note = this.$store.getters['notes/getNoteById'](this.$route.query.id)
    }
  }
}
</script>

<style scoped>
.form__control {
  border-color: transparent;
  padding: 0;
}
.empty-container {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  text-align: center;
}
</style>
