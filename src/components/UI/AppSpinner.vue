<template>
  <div
    :class="[
      'spinner-border',
      {
        'spinner-border-sm': small,
        [`text-${color}`]: color
      }
    ]"
    role="status"
  ></div>
</template>

<script>
export default {
  name: 'AppSpinner',
  props: {
    small: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      validator(value) {
        return ['primary'].includes(value)
      }
    }
  }
}
</script>
