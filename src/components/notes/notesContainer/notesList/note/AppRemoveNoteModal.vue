<template>
  <app-modal-animation>
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
  </app-modal-animation>
</template>

<script>
import AppModal from '../../../../UI/modal/AppModal'
import AppModalAnimation from '../../../../UI/modal/AppModalAnimation'

export default {
  name: 'AppRemoveNoteModal',
  components: {AppModalAnimation, AppModal},
  props: ['title', 'show'],
  emits: ['close', 'remove'],
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
