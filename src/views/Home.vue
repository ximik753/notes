<template>
  <div class="d-flex flex-direction-column min-vh-100">
    <the-header></the-header>
    <div class="container mt-3 flex-fill pb-3 row">
      <div class="col-4 border-right">
        <app-note></app-note>
      </div>
      <div class="col-8 position-relative">
        <app-note-container></app-note-container>
      </div>
    </div>
  </div>
</template>

<script>
import AppNote from '../components/notes/AppNote'
import AppNoteContainer from '../components/notes/AppNoteContainer'
import TheHeader from '../components/notes/TheHeader'

export default {
  name: 'Home',
  components: {TheHeader, AppNoteContainer, AppNote}
}
</script>
