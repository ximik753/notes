<template>
  <div
    class="border-bottom note-container p-2"
    @click="openNote"
  >
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h5>{{note.title}}</h5>
      <time>{{time}}</time>
    </div>
    <p>{{note.shortText}}</p>
  </div>
</template>

<script>
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
      return new Date(this.note.lastUpdate).getTime()
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/vareables";

h5 {
 margin: 0;
}
.selected {
  background-color: $gray-400;
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
