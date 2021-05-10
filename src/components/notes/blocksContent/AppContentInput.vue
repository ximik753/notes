<template>
  <app-add-block @add-component="addComponent($event, true)"></app-add-block>
  <div contenteditable class="content-input" @input="onChange($event.target.innerHTML)" v-html="data" v-once></div>
  <app-add-block @add-component="addComponent($event, false)"></app-add-block>
</template>

<script>
import AppAddBlock from './AppAddBlock'
import {useStore} from 'vuex'
import {debounce} from '../../../utils'

export default {
  name: 'AppContentInput',
  components: {AppAddBlock},
  props: ['data', 'componentId', 'blockIdx'],
  emits: ['add-component'],
  setup(props) {
    const store = useStore()

    const addComponent = (type, isBefore) => {
      store.commit('note/addComponent', {
        type,
        potion: isBefore ? props.blockIdx : props.blockIdx + 1
      })
    }

    const onChange = debounce(value => {
      store.dispatch('note/patchData', {nodeId: props.componentId, value})
    }, 300)

    return {addComponent, onChange}
  }
}
</script>
