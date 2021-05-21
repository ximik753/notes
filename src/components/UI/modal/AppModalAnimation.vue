<template>
  <teleport :to="to">
    <transition name="fade">
      <slot/>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'AppModalAnimation',
  props: {
    to: {
      default: 'body'
    }
  }
}
</script>
