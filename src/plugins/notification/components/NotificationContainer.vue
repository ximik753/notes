<template>
  <div class="notification__group" v-if="active.length > 0">
    <transition-group
      name="fade"
    >
      <div
        v-for="item in active"
        :key="item.id"
        class="notification__wrapper"
        :style="notifyWrapperStyle(item)"
      >
        <div :class="[classes, item.type]">
          <div
            v-if="item.title"
            class="notification__title"
            v-html="item.title"
          />
          <div
            v-html="item.text"
          />
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import events from '../events'
import {Id, Timer} from '../utils'

const STATE = {
  IDLE: 0,
  DESTROYED: 2
}

export default {
  name: 'NotificationContainer',
  props: {
    duration: {
      type: Number,
      default: 3000
    },
    speed: {
      type: Number,
      default: 300
    },
    classes: {
      type: String,
      default: 'notification'
    },
    width: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    events.on('add', this.addItem)
  },
  computed: {
    active() {
      return this.list.filter(v => v.state !== STATE.DESTROYED)
    }
  },
  methods: {
    addItem(event) {
      const duration = typeof event.duration === 'number'
        ? event.duration
        : this.duration

      const speed = typeof event.speed === 'number'
        ? event.speed
        : this.speed

      const {title, text, type, id} = event
      const item = {
        id: id || Id(),
        title,
        text,
        type,
        state: STATE.IDLE,
        speed,
        length: duration + 2 * speed
      }

      if (duration >= 0) {
        // eslint-disable-next-line no-new
        new Timer(() => this.destroy(item), item.length, item)
      }
      this.list.unshift(item)
    },
    destroy(item) {
      clearTimeout(item.timer)
      item.state = STATE.DESTROYED
      this.clean()
    },
    clean() {
      this.list = this.list.filter(v => v.state !== STATE.DESTROYED)
    },
    notifyWrapperStyle(item) {
      return {transition: `all ${item.speed}ms`}
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active, .fade-move {
  transition: all .33s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateX(-300px) scale(.2);
}
</style>
