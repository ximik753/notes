<template>
  <div class="d-flex flex-direction-column" ref="container">
    <h6 v-if="todos.length === 0">Задачи отстутстуют</h6>
    <app-todo-item
      v-else
      v-for="(item, idx) in todos"
      :key="item.id"
      :item="item"
      :id="idx"
      @change-item="changeText"
      @done-item="doneTodo"
      @remove-item="removeItem"
      @drag-start="dragStart"
      @drag-end="dragEnd"
      @drag-over="dragOver"
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
import {createTodoItemBlock, getDragAfterElement} from '../../../../utils/note'
import {getDataAttributeValue, isEqual} from '../../../../utils'

export default {
  name: 'AppTodo',
  components: {AppTodoItem},
  props: ['data'],
  emits: ['change-todo'],
  data() {
    return {
      todos: [...this.data],
      draggableItem: null
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
    dragStart(item) {
      this.draggingItem = item
    },
    dragOver(e) {
      const el = getDragAfterElement(this.$refs.container, e.clientY)
      const draggableEl = this.$refs.container.querySelector('div.dragging')
      const draggableElDataIndex = +getDataAttributeValue(draggableEl, 'id')
      const todo = [...this.todos]

      if (el) {
        const elDataIndex = +getDataAttributeValue(el, 'id')
        const elIndex = elDataIndex < draggableElDataIndex ? draggableElDataIndex + 1 : draggableElDataIndex
        todo.splice(elDataIndex, 0, this.draggingItem)
        todo.splice(elIndex, 1)
      } else {
        todo.push(this.draggingItem)
        todo.splice(draggableElDataIndex, 1)
      }

      if (!isEqual(todo, this.todos)) {
        this.todos = todo
      }
    },
    dragEnd() {
      this.draggableItem = null
    },
    addItem() {
      this.todos.push(createTodoItemBlock())
    },
    doneTodo(id) {
      this.todos.map(t => t.id === id ? t.done = !t.done : t)
    },
    changeText({value, id}) {
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
