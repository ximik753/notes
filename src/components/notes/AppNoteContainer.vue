<template>
  <div class="p-5" v-if="$route.query.id && note">
    <input class="form__control h4" v-model="title" ref="title"/>
    <component
      v-for="(component, index) in note.data"
      :key="component.id"
      :is="componentsName[index]"
      @add-component="addComponent"
      v-bind="{data: component.value, componentId: note.id, blockId: component.id}"
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
import {debounce} from '../../utils'

export default {
  name: 'AppNoteContainer',
  components: {AppContentInput, AppContentTodo},
  data() {
    return {
      note: null,
      title: ''
    }
  },
  mounted() {
    this.loadNote()
  },
  watch: {
    '$route.query.id'() {
      this.loadNote()
    },
    title(newTitle) {
      this.updateTitle(newTitle)
    }
  },
  computed: {
    componentsName() {
      return this.note.data.map(item => `app-content-${item.type}`)
    }
  },
  methods: {
    addComponent(type, index) {
      this.note.data.splice(index, 0, {type, value: type === 'input' ? '' : [], id: Date.now()})
    },
    loadNote() {
      if (this.$route.query.id) {
        const note = this.$store.getters['notes/getNoteById'](this.$route.query.id)
        if (note) {
          this.note = note
          this.title = note.title

          if (this.$route.query.new) {
            this.$refs.title.focus()
          }
        }
      }
    },
    updateTitle: debounce(function(title) {
      this.$store.commit('notes/changeTitle', {title, id: this.note.id})
    }, 500)
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
