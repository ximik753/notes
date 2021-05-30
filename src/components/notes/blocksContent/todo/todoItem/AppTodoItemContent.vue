<template>
  <div class="d-flex align-items-center w-100">
    <input type="checkbox" :checked="item.done" @input="$emit('done-item', item.id)"/>
    <input
      type="text"
      :value="item.value"
      :class="['form__control', 'ml-1', 'mr-1', {done: item.done}]"
      @input="$emit('change-item', {value: $event.target.value, id: item.id})"
      ref="newItem"
    />
  </div>
  <button
    class="btn btn-danger btn-sm align-self-center"
    @click="$emit('remove-item', item.id)"
  >&times;</button>
</template>

<script>
export default {
  name: 'AppTodoItemContent',
  props: ['item'],
  emits: ['change-item', 'done-item', 'remove-item'],
  mounted() {
    this.$refs.newItem.focus()
  }
}
</script>

<style scoped lang="scss">
@import "../../../../../assets/scss/form";

input[type=text] {
  padding: 3px;
  border-color: transparent;
  &.done {
    text-decoration: line-through;
  }
}
</style>
