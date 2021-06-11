<template>
  <div
    class="content-input-edit d-flex justify-content-center align-items-center"
    v-if="visible"
    :style="potionContent"
  >
    <button
      v-for="button in buttons"
      :class="['btn-sm', {selected: styles[button.action]}]"
      :key="button.title"
      @click="execCommand(button.action)"
    >{{button.title}}</button>
  </div>
</template>

<script>
export default {
  name: 'AppContentInputEdit',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    position: {
      type: Object,
      required: true
    },
    styles: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      buttons: [
        {title: 'B', action: 'bold'},
        {title: 'I', action: 'italic'}
      ]
    }
  },
  methods: {
    execCommand(command) {
      document.execCommand(command)
    }
  },
  computed: {
    potionContent() {
      return {
        top: `${this.position.y - 30}px`,
        left: `${this.position.x}px`
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/scss/vareables";

.content-input-edit {
  position: fixed;
  background-color: $gray-500;
  padding: .3rem;
  border-radius: 5px;
  column-gap: .3rem;
  z-index: 50;
  transform: translateX(-25%);
}
button {
  width: 20px;
  height: 20px;
  border: none;
  background-color: $white;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  padding: 0;
  transition: background-color .33s ease;
  &:hover {
    background-color: $gray-200;
  }
  &.selected {
    background-color: $gray-400;
  }
}
</style>
