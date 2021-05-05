<template>
  <app-add-block @add-component="addComponent($event, true)"></app-add-block>
  <div class="d-flex flex-direction-column">
    <div
      v-for="item in todos"
      :key="item.value"
      class="d-flex justify-content-between align-items-center mb-2"
    >
      <div class="d-flex align-items-center">
        <input type="checkbox" :checked="item.done">
        <input
          type="text"
          :value="item.value"
          :class="['form__control', 'ml-1', {done: item.done}]"
        >
      </div>
      <button class="btn btn-danger btn-sm align-self-center">&times;</button>
    </div>
    <button class="btn btn-success mt-2" @click="addTodo">Добавить</button>
  </div>
  <app-add-block @add-component="addComponent($event, false)"></app-add-block>
</template>

<script>
import AppAddBlock from './AppAddBlock'

export default {
  name: 'AppContentTodo',
  components: {AppAddBlock},
  props: ['data', 'componentId'],
  emits: ['add-component'],
  data() {
    return {
      todos: this.data
    }
  },
  methods: {
    addComponent(type, isBefore) {
      this.$emit('add-component', type, isBefore ? this.componentId : this.componentId + 1)
    },
    addTodo() {
      this.todos.push({value: Date.now(), done: false})
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/form";

input[type=text] {
  @extend .form__control;
  padding: 3px;
  border-color: transparent;
  &.done {
    text-decoration: line-through;
  }
}
</style>
