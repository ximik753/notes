<template>
  <div class="list" v-if="$store.state.notes.notes.length > 0">
    <app-note
      v-for="note in $store.state.notes.notes"
      :key="note.id"
      :note="note"
      @remove-note="openModal"
    ></app-note>
  </div>
  <div v-else class="d-flex justify-content-center align-items-center h-100 text-center">
    Заметки отсутствуют.
    <br>
    Создайте новую прямо сейчас.
  </div>
  <app-remove-note-modal
    :show="open"
    :title="noteTitle"
    @remove="removeNote"
    @close="closeModal"
  ></app-remove-note-modal>
</template>

<script>
import AppNote from './note/AppNote'
import AppRemoveNoteModal from './note/AppRemoveNoteModal'

export default {
  name: 'AppNotesList',
  components: {AppRemoveNoteModal, AppNote},
  data() {
    return {
      open: false,
      removeNoteId: null
    }
  },
  methods: {
    openModal(id) {
      this.open = true
      this.removeNoteId = id
    },
    closeModal() {
      this.open = false
    },
    async removeNote() {
      await this.$store.dispatch('notes/removeNote', this.removeNoteId)
      this.open = false
    }
  },
  computed: {
    noteTitle() {
      const note = this.$store.getters['notes/getNoteById'](this.removeNoteId)
      return note?.title || 'Без названия'
    }
  }
}
</script>

<style scoped>
.list {
  overflow-y: auto;
}
</style>
