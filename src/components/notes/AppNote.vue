<template>
  <div
    :class="['border-bottom', 'note-container', 'p-2', {selected: +$route.query.id === note.id}]"
    @click="openNote"
  >
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h6>{{note.title || 'Без названия'}}</h6>
      <time>{{time}}</time>
    </div>
    <p>{{note.shortText}}</p>
  </div>
</template>

<script>
import {timeParse} from '../../utils/time'

export default {
  name: 'AppNote',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  methods: {
    openNote() {
      this.$router.push({name: 'Home', query: {id: this.note.id}})
    }
  },
  computed: {
    time() {
      return timeParse(this.note.last_update)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/vareables";

h6 {
  margin: 0 3rem 0 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.selected {
  background-color: $gray-200;
}
p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
}
.note-container {
  cursor: pointer;
  transition: background-color;
  &:hover {
    background-color: $gray-100;
  }
}
</style>
