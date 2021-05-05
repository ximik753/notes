<template>
  <div class="d-flex flex-direction-column min-vh-100">
    <the-header></the-header>
    <div class="container mt-3 flex-fill pb-3 row">
      <div class="col-4 border-right p-2">
        <button class="btn btn-primary w-100">Создать</button>
        <app-note
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

export default {
  name: 'Home',
  components: {AppNote, TheHeader, AppNoteContainer}
}
</script>
