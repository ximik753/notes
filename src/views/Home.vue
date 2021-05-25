<template>
  <div class="d-flex flex-direction-column min-vh-100">
    <the-header></the-header>
    <div class="container pb-3 d-flex">
      <aside class="position-fixed border-right p-2">
        <app-notes-container></app-notes-container>
      </aside>
      <main
        class="w-100"
        :class="{'full-height': !$store.state.note.note || $store.state.note.fetching}"
      >
        <app-note-container></app-note-container>
      </main>
    </div>
  </div>
</template>

<script>
import AppNoteContainer from '../components/notes/noteContainer/AppNoteContainer'
import TheHeader from '../components/notes/TheHeader'
import AppNotesContainer from '../components/notes/notesContainer/AppNotesContainer'

export default {
  name: 'Home',
  components: {AppNotesContainer, TheHeader, AppNoteContainer}
}
</script>

<style scoped lang="scss">
@import "../assets/scss/vareables";

aside {
  width: $aside-width;
  height: 100vh;
  top: $header-height;
}
main {
  margin-left: $main-margin;
  padding-top: $main-padding-top;
}
.full-height {
  height: $main-container-height;
}
</style>
