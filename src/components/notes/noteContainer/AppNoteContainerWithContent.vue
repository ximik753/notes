<template>
  <small class="position-absolute text-update" v-if="$store.state.note.updating">
    Обновление данных
    <app-spinner small color="primary"></app-spinner>
  </small>
  <app-note-container-title></app-note-container-title>
  <component
    v-for="(component, index) in components"
    :key="component.id"
    :is="componentsName[index]"
    v-bind="{
      data: component.data,
      componentId: component.id,
      blockIdx: index,
      totalComponents: components.length
    }"
  ></component>
</template>

<script>
import AppContentInput from '../blocksContent/input/AppContentInput'
import AppContentTodo from '../blocksContent/todo/AppContentTodo'
import AppSpinner from '../../UI/AppSpinner'
import AppNoteContainerTitle from './AppNoteContainerTitle'
import {createInputBlock} from '../../../utils/note'

export default {
  name: 'AppNoteContainerWithContent',
  components: {AppNoteContainerTitle, AppContentInput, AppContentTodo, AppSpinner},
  computed: {
    componentsName() {
      return this.$store.getters['note/getData']
        .map(item => `app-content-${item.type}`)
    },
    components() {
      return this.$store.getters['note/getData'] || [createInputBlock()]
    },
    hasNote() {
      const noteId = this.$store.getters['note/getId']
      return this.$store.getters['notes/getNoteById'](noteId)
    }
  },
  watch: {
    hasNote() {
      this.$router.push('/')
      this.$store.commit('note/setNote', null)
    }
  }
}
</script>

<style scoped>
.text-update {
  top: 15px;
}
</style>
