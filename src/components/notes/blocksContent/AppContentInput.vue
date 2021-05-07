<template>
  <app-add-block @add-component="addComponent($event, true)"></app-add-block>
  <div contenteditable class="content-input" @input="onChange($event.target.textContent)">{{text}}</div>
  <app-add-block @add-component="addComponent($event, false)"></app-add-block>
</template>

<script>
import AppAddBlock from './AppAddBlock'
import {debounce} from '../../../utils'

export default {
  name: 'AppContentInput',
  components: {AppAddBlock},
  props: ['data', 'componentId', 'blockId'],
  emits: ['add-component'],
  data() {
    return {
      text: this.data
    }
  },
  methods: {
    addComponent(type, isBefore) {
      this.$emit('add-component', type, isBefore ? this.componentId : this.componentId + 1)
    },
    onChange(value) {
      this.changeValue(value)
    },
    changeValue: debounce(function(value) {
      this.$store.commit('notes/patchData', {value, nodeId: this.blockId, noteId: this.componentId})
    }, 500)
  }
}
</script>
