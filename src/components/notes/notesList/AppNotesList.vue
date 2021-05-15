<template>
  <app-add-note-button></app-add-note-button>
  <div
    v-if="$store.state.notes.notes === null"
    class="d-flex justify-content-center mt-3"
  >
    <app-spinner color="primary"/>
  </div>
  <template v-else>
    <div class="list">
      <app-note
        v-for="note in $store.state.notes.notes"
        :key="note.id"
        :note="note"
        @remove-note="openModal"
      ></app-note>
    </div>
    <app-remove-note-modal
      :show="open"
      :title="noteTitle"
      @remove="removeNote"
      @close="closeModal"
    ></app-remove-note-modal>
  </template>
</template>

<script>
import AppAddNoteButton from './AppAddNoteButton'
import AppSpinner from '../../UI/AppSpinner'
import AppNote from '../AppNote'
import AppRemoveNoteModal from './AppRemoveNoteModal'

export default {
  name: 'AppNotesList',
  components: {AppRemoveNoteModal, AppAddNoteButton, AppSpinner, AppNote},
  data() {
    return {
      open: false,
      removeNoteId: null
    }
  },
  async mounted() {
    await this.$store.dispatch('notes/fetchNotes')
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
