<template>
  <app-add-block @add-component="addComponent($event, true, blockIdx)"></app-add-block>
  <div contenteditable class="content-input" @input="onChange(componentId, $event.target.innerHTML)" v-html="data" v-once></div>
  <app-add-block @add-component="addComponent($event, false, blockIdx)"></app-add-block>
</template>

<script>
import AppAddBlock from './AppAddBlock'
import {useContentBlock} from '../../../hooks/contentBlock'

export default {
  name: 'AppContentInput',
  components: {AppAddBlock},
  props: ['data', 'componentId', 'blockIdx'],
  setup() {
    return {...useContentBlock()}
  }
}
</script>
