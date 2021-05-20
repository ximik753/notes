<template>
  <div
    :class="['border-bottom', 'note-container', 'p-2', {selected: +$route.query.id === note.id}]"
    @click="openNote"
  >
    <div class="d-flex justify-content-between align-items-center mb-2 position-relative">
      <h6>{{note.title || 'Без названия'}}</h6>
      <time class="mr-4">{{time}}</time>
      <div class="position-absolute note-delete" @click.stop="remove(note.id)">&times;</div>
    </div>
    <p>{{note.shortText}}</p>
  </div>
</template>

<script>
import {timeParse} from '../../../../../utils/time'

export default {
  name: 'AppNote',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  emits: ['remove-note'],
  methods: {
    openNote() {
      this.$router.push({name: 'Home', query: {id: this.note.id}})
    },
    remove(id) {
      this.$emit('remove-note', id)
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
@import "../../../../../assets/scss/vareables";

h6 {
  margin: 0 3rem 0 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
time {
  font-size: 14px;
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
.note-delete {
  top: -10px;
  right: -1px;
  font-size: 24px;
  transition: all .22s ease;
  opacity: 0;
  color: $gray-600;
  &:hover {
    opacity: 1;
  }
}
</style>
