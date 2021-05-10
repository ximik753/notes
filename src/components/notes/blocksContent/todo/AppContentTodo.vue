<template>
  <app-add-block @add-component="addComponent($event, true, blockIdx)"></app-add-block>
  <app-todo
    :data="data"
    @change-todo="onChange(componentId, $event)"
  ></app-todo>
  <app-add-block @add-component="addComponent($event, false, blockIdx)"></app-add-block>
</template>

<script>
import AppAddBlock from '../AppAddBlock'
import AppTodo from './AppTodo'
import {useContentBlock} from '../../../../hooks/contentBlock'

export default {
  name: 'AppContentTodo',
  components: {AppTodo, AppAddBlock},
  props: ['data', 'componentId', 'blockIdx'],
  setup() {
    return {...useContentBlock()}
  }
}
</script>
