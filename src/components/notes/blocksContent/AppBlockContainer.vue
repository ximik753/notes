<template>
  <div class="position-relative">
    <app-add-block
      @add-component="addComponent($event, true, blockIdx)"
      class="block"
    ></app-add-block>
    <div class="block-container">
      <slot></slot>
    </div>
    <app-add-block
      @add-component="addComponent($event, false, blockIdx)"
      class="block"
      v-if="blockIdx + 1 === totalComponents"
    ></app-add-block>
  </div>
</template>

<script>
import AppAddBlock from './AppAddBlock'
import {useContentBlock} from '../../../hooks/contentBlock'

export default {
  name: 'AppBlockContainer',
  components: {AppAddBlock},
  props: {
    blockIdx: {
      required: true,
      type: Number
    },
    totalComponents: {
      required: true,
      type: Number
    }
  },
  setup() {
    return {...useContentBlock()}
  }
}
</script>

<style scoped lang="scss">
.block {
  &:first-child {
    left: 0;
    top: -16px;
  }
  &:last-child {
    left: 0;
    bottom: -16px;
  }
}
.block-container {
  padding: 10px 0;
}
</style>
