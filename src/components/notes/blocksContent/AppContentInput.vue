<template>
  <app-add-block></app-add-block>
  <div contenteditable class="content-input">{{data}}</div>
  <app-add-block></app-add-block>
</template>

<script>
import AppAddBlock from './AppAddBlock'

export default {
  name: 'AppContentInput',
  components: {AppAddBlock},
  props: ['data']
}
</script>
