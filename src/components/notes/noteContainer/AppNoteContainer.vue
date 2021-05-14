<template>
  <div class="d-flex justify-content-center align-items-center h-100" v-if="loading">
    <app-spinner color="primary"></app-spinner>
  </div>
  <div class="p-5 position-relative" v-else-if="!loading && $store.state.note.note">
    <app-note-container-with-content></app-note-container-with-content>
  </div>
  <div v-else class="position-absolute empty-container">
    <img class="logo" src="../../../assets/images/note.png" alt="logo">
    <p class="empty-text">Выберите заметку или создате новую</p>
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

    watch(() => route.query.id, async() => await fetchNote())

    const loading = computed(() => store.state.note.fetching)

    return {loading}
  }
}
</script>

<style scoped>
.empty-container {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  text-align: center;
}
</style>
