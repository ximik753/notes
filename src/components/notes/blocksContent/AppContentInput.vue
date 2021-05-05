<template>
  <app-add-block @add-component="addComponent($event, true)"></app-add-block>
  <div contenteditable class="content-input">{{data}}</div>
  <app-add-block @add-component="addComponent($event, false)"></app-add-block>
</template>

<script>
import AppAddBlock from './AppAddBlock'

export default {
  name: 'AppContentInput',
  components: {AppAddBlock},
  props: ['data', 'componentId'],
  emits: ['add-component'],
  methods: {
    addComponent(type, isBefore) {
      this.$emit('add-component', type, isBefore ? this.componentId : this.componentId + 1)
    }
  }
}
</script>
