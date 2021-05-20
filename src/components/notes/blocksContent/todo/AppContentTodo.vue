<template>
  <app-block-container
    :block-idx="blockIdx"
    :total-components="totalComponents"
    :component-id="componentId"
  >
    <app-todo
      :data="data"
      @change-todo="onChange(componentId, $event)"
    ></app-todo>
  </app-block-container>
</template>

<script>
import AppBlockContainer from '../AppBlockContainer'
import AppTodo from './AppTodo'
import {useContentBlock} from '../../../../hooks/contentBlock'

export default {
  name: 'AppContentTodo',
  components: {AppBlockContainer, AppTodo},
  props: {
    data: {
      required: true
    },
    componentId: {
      required: true
    },
    blockIdx: {
      required: true
    },
    totalComponents: {
      required: true
    }
  },
  setup() {
    return {...useContentBlock()}
  }
}
</script>
