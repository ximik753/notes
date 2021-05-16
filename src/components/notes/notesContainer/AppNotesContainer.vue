<template>
  <app-add-note-button></app-add-note-button>
  <div
    v-if="$store.state.notes.notes === null"
    class="d-flex justify-content-center mt-3"
  >
    <app-spinner color="primary"/>
  </div>
  <app-notes-list v-else></app-notes-list>
</template>

<script>
import AppAddNoteButton from './notesList/AppAddNoteButton'
import AppSpinner from '../../UI/AppSpinner'
import AppNotesList from './notesList/AppNotesList'

export default {
  name: 'AppNotesContainer',
  components: {AppNotesList, AppAddNoteButton, AppSpinner},
  async mounted() {
    await this.$store.dispatch('notes/fetchNotes')
  }
}
</script>
