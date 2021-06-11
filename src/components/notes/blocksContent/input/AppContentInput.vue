<template>
  <app-block-container
    :block-idx="blockIdx"
    :totalComponents="totalComponents"
    :component-id="componentId"
  >
    <app-content-input-edit
      :visible="visible && isSelection"
      :position="selectionPosition"
      :styles="selectionStyles"
    ></app-content-input-edit>
    <div
      contenteditable
      class="content-input"
      placeholder="Нажмите, чтобы изменить содержимое поля"
      @input="onChange(componentId, $event.target.innerHTML)"
      @mousedown="mouseDownHandler"
      v-html="data"
      v-once
    ></div>
  </app-block-container>
</template>

<script>
import AppBlockContainer from '../AppBlockContainer'
import AppContentInputEdit from './AppContentInputEdit'
import {ref, watch} from 'vue'
import {useContentBlock} from '../../../../hooks/contentBlock'
import {useSelection} from '../../../../hooks/selection'

export default {
  name: 'AppContentInput',
  components: {AppContentInputEdit, AppBlockContainer},
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
    const visible = ref(false)
    const touch = ref(false)
    const {isSelection, selectionStyles, isMouseDown, selectionPosition} = useSelection()

    const mouseDownHandler = () => {
      visible.value = false
      touch.value = true
    }

    watch(isSelection, () => {
      if (visible.value) {
        visible.value = false
      }
    })

    watch(isMouseDown, () => {
      if (touch.value && !isMouseDown.value) {
        visible.value = true
        touch.value = false
      }
    })

    return {
      visible,
      selectionPosition,
      selectionStyles,
      isSelection,
      mouseDownHandler,
      ...useContentBlock()
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/scss/vareables";

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
