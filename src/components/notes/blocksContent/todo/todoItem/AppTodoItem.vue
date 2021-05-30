<template>
  <div
    class="d-flex justify-content-between align-items-center mb-2"
    @dragstart="dragStart"
    @dragend="dragEnd"
    @dragover.prevent="dragOver"
    :data-id="id"
    data-type="dragging"
    draggable="true"
  >
    <app-todo-item-content
      :item="item"
      @change-item="$emit('change-item', $event)"
      @done-item="$emit('done-item', $event)"
      @remove-item="$emit('remove-item', $event)"
    ></app-todo-item-content>
  </div>
</template>

<script>
import AppTodoItemContent from './AppTodoItemContent'

export default {
  name: 'AppTodoItem',
  components: {AppTodoItemContent},
  props: ['item', 'id'],
  emits: ['change-item', 'done-item', 'remove-item', 'drag-start', 'drag-end', 'drag-over'],
  methods: {
    dragStart(e) {
      this.$emit('drag-start', this.item)
      e.target.classList.add('dragging')
    },
    dragEnd(e) {
      this.$emit('drag-end')
      e.target.classList.remove('dragging')
    },
    dragOver(e) {
      this.$emit('drag-over', e)
    }
  }
}
</script>

<style lang="scss">
@import "../../../../../assets/scss/vareables";

.dragging {
  background-color: $gray-400;
}
</style>
