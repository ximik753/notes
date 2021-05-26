<template>
  <div
    class="d-flex justify-content-between align-items-center mb-2"
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
  props: ['item'],
  emits: ['change-item', 'done-item', 'remove-item']
}
</script>
