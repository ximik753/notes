<template>
  <div class="d-flex flex-direction-column">
    <h6 v-if="todos.length === 0">Задачи отстутстуют</h6>
    <div
      v-else
      v-for="item in todos"
      :key="item.id"
      class="d-flex justify-content-between align-items-center mb-2"
    >
      <div class="d-flex align-items-center">
        <input type="checkbox" :checked="item.done" @input="doneTodo(item.id)"/>
        <input
          type="text"
          :value="item.value"
          :class="['form__control', 'ml-1', {done: item.done}]"
          @input="changeText($event.target.value, item.id)"
          ref="newItem"
        />
      </div>
      <button
        class="btn btn-danger btn-sm align-self-center"
        @click="removeItem(item.id)"
      >&times;</button>
    </div>
    <button class="btn btn-success mt-2" @click="addItem">Добавить</button>
  </div>
</template>

<script>
import {createTodoItemBlock} from '../../../../utils/note'

export default {
  name: 'AppTodo',
  props: ['data'],
  emits: ['change-todo'],
  data() {
    return {
      todos: this.data
    }
  },
  watch: {
    todos: {
      handler(value) {
        this.$emit('change-todo', value)
      },
      deep: true
    }
  },
  methods: {
    addItem() {
      this.todos.push(createTodoItemBlock())
      this.$nextTick(() => this.$refs.newItem.focus())
    },
    doneTodo(id) {
      this.todos.map(t => t.id === id ? t.done = !t.done : t)
    },
    changeText(value, id) {
      this.todos.map(t => t.id === id ? t.value = value : t)
    },
    removeItem(id) {
      this.todos = this.todos.filter(t => t.id !== id)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/scss/form";

input[type=text] {
  @extend .form__control;
  padding: 3px;
  border-color: transparent;
  &.done {
    text-decoration: line-through;
  }
}
</style>
