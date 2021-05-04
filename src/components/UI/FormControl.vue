<template>
  <div :class="['form__group', {invalid: error}]">
    <label :for="id">{{label}}</label>
    <input
      class="form__control"
      :type="type"
      :id="id"
      :value="value"
      :autocomplete="autocomplete ? 'on' : 'off'"
      @blur="blurHandler"
      @input="$emit('update:value', $event.target.value)"
    >
    <small class="form__error">{{error}}</small>
  </div>
</template>

<script>
export default {
  name: 'FormControl',
  props: {
    label: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    id: {
      required: true,
      type: String
    },
    value: {
      type: String,
      required: true
    },
    error: {
      type: String
    },
    blurHandler: {
      type: Function,
      required: true
    },
    autocomplete: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value']
}
</script>
