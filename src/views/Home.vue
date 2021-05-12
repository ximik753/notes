<template>
  <div class="d-flex flex-direction-column min-vh-100">
    <the-header></the-header>
    <div class="container mt-3 flex-fill pb-3 row">
      <div class="col-4 border-right p-2">
        <button
          class="btn btn-primary w-100 mb-2"
          @click="createNote"
          :disabled="$store.state.notes.notes === null || $store.state.notes.creating"
        >Создать</button>
        <div
          v-if="$store.state.notes.notes === null"
          class="d-flex justify-content-center mt-3"
        >
          <app-spinner color="primary"/>
        </div>
        <app-note
          v-else
          v-for="note in $store.state.notes.notes"
          :key="note.id"
          :note="note"
        ></app-note>
      </div>
      <div class="col-8 position-relative">
        <app-note-container></app-note-container>
      </div>
    </div>
  </div>
</template>

<script>
import AppNoteContainer from '../components/notes/AppNoteContainer'
import TheHeader from '../components/notes/TheHeader'
import AppNote from '../components/notes/AppNote'
import AppSpinner from '../components/UI/AppSpinner'

export default {
  name: 'Home',
  components: {AppSpinner, AppNote, TheHeader, AppNoteContainer},
  methods: {
    createNote() {
      this.$store.dispatch('notes/createNote')
    }
  },
  async mounted() {
    await this.$store.dispatch('notes/fetchNotes')
  }
}
</script>
