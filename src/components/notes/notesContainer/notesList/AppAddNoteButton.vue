<template>
  <button
    class="btn btn-primary w-100 mb-2"
    @click="createNote"
    :disabled="$store.state.notes.notes === null || $store.state.notes.creating"
  >
    Создать
  </button>
</template>

<script>
export default {
  name: 'AppAddNoteButton',
  methods: {
    createNote() {
      this.$store.dispatch('notes/createNote')
    }
  }
}
</script>
