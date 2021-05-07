<template>
  <app-add-block @add-component="addComponent($event, true)"></app-add-block>
  <div class="d-flex flex-direction-column">
    <h6 v-if="todos.length === 0">Задачи отстутстуют</h6>
    <div
      v-for="item in todos"
      :key="item.id"
      class="d-flex justify-content-between align-items-center mb-2"
      v-else
    >
      <div class="d-flex align-items-center">
        <input type="checkbox" :checked="item.done" @input="doneTodo(item.id)"/>
        <input
          type="text"
          :value="item.value"
          :class="['form__control', 'ml-1', {done: item.done}]"
          @input="changeText($event.target.value, item.id)"
          ref="newRef"
        />
      </div>
      <button
        class="btn btn-danger btn-sm align-self-center"
        @click="removeTodo(item.id)"
      >&times;</button>
    </div>
    <button class="btn btn-success mt-2" @click="addTodo">Добавить</button>
  </div>
  <app-add-block @add-component="addComponent($event, false)"></app-add-block>
</template>

<script>
import AppAddBlock from './AppAddBlock'
import {debounce} from '../../../utils'

export default {
  name: 'AppContentTodo',
  components: {AppAddBlock},
  props: ['data', 'componentId', 'blockId'],
  emits: ['add-component'],
  data() {
    return {
      todos: this.data
    }
  },
  watch: {
    todos: {
      handler(value) {
        this.changeValue(value)
      },
      deep: true
    }
  },
  methods: {
    addComponent(type, isBefore) {
      this.$emit('add-component', type, isBefore ? this.componentId : this.componentId + 1)
    },
    addTodo() {
      this.todos.push({value: '', done: false, id: Date.now()})
      this.$nextTick(() => this.$refs.newRef.focus())
    },
    removeTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id)
    },
    doneTodo(id) {
      this.todos.map(t => t.id === id ? t.done = !t.done : t)
    },
    changeText(value, id) {
      this.todos.map(t => t.id === id ? t.value = value : t)
    },
    changeValue: debounce(function(value) {
      this.$store.commit('notes/patchData', {value, nodeId: this.blockId, noteId: this.componentId})
    }, 300)
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
