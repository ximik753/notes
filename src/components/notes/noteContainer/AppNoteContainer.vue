<template>
  <div class="d-flex justify-content-center align-items-center h-100" v-if="loading">
    <app-spinner color="primary"></app-spinner>
  </div>
  <div
    class="pl-5 pr-5 pb-2 position-relative"
    v-else-if="!loading && $store.state.note.note"
  >
    <app-note-container-with-content></app-note-container-with-content>
  </div>
  <div v-else class="d-flex justify-content-center align-items-center h-100 text-center">
    <div class="empty-container">
      <img class="logo" src="../../../assets/images/notes/note.png" alt="logo">
      <p class="empty-text">Выберите заметку или создате новую</p>
    </div>
  </div>
</template>

<script>
import AppSpinner from '../../UI/AppSpinner'
import AppNoteContainerWithContent from './AppNoteContainerWithContent'
import {computed, onMounted, watch} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

export default {
  name: 'AppNoteContainer',
  components: {AppNoteContainerWithContent, AppSpinner},
  setup() {
    const route = useRoute()
    const store = useStore()

    const fetchNote = async() => await store.dispatch('note/fetch', route.query.id)

    onMounted(async() => route.query.id && await fetchNote())

    watch(() => route.query.id, async() => {
      if (route.query.id) {
        await fetchNote()
      }
    })

    const loading = computed(() => store.state.note.fetching)

    return {loading}
  }
}
</script>

<style scoped>
.empty-container {
  width: 200px;
}
</style>
