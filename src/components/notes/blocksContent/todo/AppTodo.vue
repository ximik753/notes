<template>
  <div class="d-flex flex-direction-column">
    <h6 v-if="todos.length === 0">Задачи отстутстуют</h6>
    <app-todo-item
      v-else
      v-for="item in todos"
      :key="item.id"
      :item="item"
      @change-item="changeText"
      @done-item="doneTodo"
      @remove-item="removeItem"
    ></app-todo-item>
  </div>
  <button
    ref="noop"
    class="btn btn-success mt-2 w-100"
    @click="addItem"
  >Добавить</button>
</template>

<script>
import AppTodoItem from './todoItem/AppTodoItem'
import {createTodoItemBlock} from '../../../../utils/note'

export default {
  name: 'AppTodo',
  components: {AppTodoItem},
  props: ['data'],
  emits: ['change-todo'],
  data() {
    return {
      todos: [...this.data]
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
  },
  mounted() {
    this.$refs.noop.focus()
  }
}
</script>
