<template>
  <button
    class="btn"
    @click="onClick"
  >
    <img
      :src="icon"
      width="11"
      :class="className"
      alt="icon"
    ></button>
</template>

<script>
export default {
  name: 'AppBlockControlButton',
  props: {
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    onClick: {
      type: Function,
      default: function() {}
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/scss/vareables";

button.btn {
  padding: 0 5px;
  transition: background-color .33s ease;
  border-radius: 0;
  &:hover {
    background-color: $gray-400;
  }
}
.arrow-top {
  transform: rotate(180deg);
}
</style>
