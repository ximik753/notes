<template>
  <teleport to="body">
    <transition name="fade">
      <app-modal
        v-if="show"
        @close="close"
      >
        <template #title>Удаление</template>
        <template #body>
          Вы действительно хотите удалить заметку с названим {{title}}
          <br>
          <br>
          Отменить это действие <strong>будет не возможно</strong>
        </template>
        <template #footer>
          <div class="d-flex justify-content-end">
            <button class="btn btn-primary mr-3" @click="close" :disabled="$store.state.notes.removing">Отмена</button>
            <button class="btn btn-danger" :disabled="$store.state.notes.removing" @click="$emit('remove')">Удалить</button>
          </div>
        </template>
      </app-modal>
    </transition>
  </teleport>
</template>

<script>
import AppModal from '../../UI/modal/AppModal'

export default {
  name: 'AppRemoveNoteModal',
  components: {AppModal},
  props: ['title', 'show'],
  emits: ['close', 'remove'],
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
