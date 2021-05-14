<template>
  <app-add-note-button></app-add-note-button>
  <div
    v-if="$store.state.notes.notes === null"
    class="d-flex justify-content-center mt-3"
  >
    <app-spinner color="primary"/>
  </div>
  <div v-else class="list">
    <app-note
      v-for="note in $store.state.notes.notes"
      :key="note.id"
      :note="note"
    ></app-note>
  </div>
</template>

<script>
import AppAddNoteButton from './AppAddNoteButton'
import AppSpinner from '../../UI/AppSpinner'
import AppNote from '../AppNote'

export default {
  name: 'AppNotesList',
  components: {AppAddNoteButton, AppSpinner, AppNote},
  async mounted() {
    await this.$store.dispatch('notes/fetchNotes')
  }
}
</script>

<style scoped>
.list {
  overflow-y: auto;
}
</style>
