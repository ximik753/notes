<template>
  <app-modal-animation>
    <app-modal
      @close="close"
    >
      <template #title>Удаление</template>
      <template #body>
        Вы действительно хотите удалить данный блок?
        <br>
        <br>
        Отменить это действие <strong>будет не возможно</strong>
      </template>
      <template #footer>
        <div class="d-flex justify-content-end">
          <button class="btn btn-primary mr-3" @click="close">Отмена</button>
          <button class="btn btn-danger" @click="$emit('remove')">Удалить</button>
        </div>
      </template>
    </app-modal>
  </app-modal-animation>
</template>

<script>
import AppModalAnimation from '../../../UI/modal/AppModalAnimation'
import AppModal from '../../../UI/modal/AppModal'

export default {
  name: 'AppBlockRemoveModal',
  components: {AppModal, AppModalAnimation},
  emits: ['close', 'remove'],
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
