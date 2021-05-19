<template>
  <app-block-container
    :block-idx="blockIdx"
    :totalComponents="totalComponents"
  >
    <div
      contenteditable
      class="content-input"
      placeholder="Нажмите, чтобы изменить содержимое поля"
      @input="onChange(componentId, $event.target.innerHTML)"
      v-html="data"
      v-once
    ></div>
  </app-block-container>
</template>

<script>
import {useContentBlock} from '../../../hooks/contentBlock'
import AppBlockContainer from './AppBlockContainer'

export default {
  name: 'AppContentInput',
  components: {AppBlockContainer},
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

<style scoped lang="scss">
@import "../../../assets/scss/vareables";

.content-input {
  border-color: transparent;
  padding: 0;
  &:empty:before {
    content: attr(placeholder);
    color: $gray-600;
  }
  &:focus {
    border-color: $blue;
  }
}
</style>
