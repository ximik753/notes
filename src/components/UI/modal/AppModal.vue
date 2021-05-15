<template>
  <div class="modal">
    <div class="modal__backdrop">
      <div class="modal__window">
        <div class="modal__header">
          <h6>
            <slot name="title"/>
          </h6>
          <div class="modal__close" @click="$emit('close')">&times;</div>
        </div>
        <div class="modal__body">
          <slot name="body"/>
        </div>
        <div class="modal__footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  emits: ['close']
}
</script>

<style scoped lang="scss">
@import "modal";

h6 {
  margin: 0;
}
</style>
