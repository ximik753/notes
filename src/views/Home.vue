<template>
  <div class="d-flex flex-direction-column min-vh-100">
    <the-header></the-header>
    <div class="container mt-3 flex-fill pb-3 row">
      <div class="col-4 border-right p-2">
        <app-notes-list></app-notes-list>
      </div>
      <div class="col-8 position-relative">
        <app-note-container></app-note-container>
      </div>
    </div>
  </div>
</template>

<script>
import AppNoteContainer from '../components/notes/noteContainer/AppNoteContainer'
import TheHeader from '../components/notes/TheHeader'
import AppNotesList from '../components/notes/notesList/AppNotesList'

export default {
  name: 'Home',
  components: {AppNotesList, TheHeader, AppNoteContainer}
}
</script>
