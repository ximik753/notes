<template>
  <div class="position-relative wrapper">
    <app-add-block
      @add-component="addComponent($event, true, blockIdx)"
      class="block"
    ></app-add-block>
    <div class="block-container">
      <app-block-control
        :component-id="componentId"
        :total-components="totalComponents"
        :block-idx="blockIdx"
      ></app-block-control>
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
import AppBlockControl from './blockControl/AppBlockControl'
import {useContentBlock} from '../../../hooks/contentBlock'

export default {
  name: 'AppBlockContainer',
  components: {AppBlockControl, AppAddBlock},
  props: {
    blockIdx: {
      required: true,
      type: Number
    },
    totalComponents: {
      required: true,
      type: Number
    },
    componentId: {
      required: true
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
  padding: 15px 0;
  position: relative;
}
.wrapper {
  padding-top: .3rem;
  &:hover .block-control {
    opacity: 1;
  }
}
</style>
