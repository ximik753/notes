<template>
  <div class="d-flex justify-content-between align-items-center">
    <input class="form__control h4" v-model="title" ref="refTitle" placeholder="Название"/>
    <time>{{date}}</time>
  </div>
  <small class="form__error" v-if="title?.length > 15">Заголовок должен быть меньше 15 символов, сейчас {{title?.length}} символов</small>
</template>

<script>
import {computed, onMounted, ref} from 'vue'
import {debounce} from '../../../utils'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {getFullDate} from '../../../utils/time'

export default {
  name: 'AppNoteContainerTitle',
  setup() {
    const store = useStore()
    const route = useRoute()
    const refTitle = ref(null)

    const title = computed({
      get() {
        return store.getters['note/getTitle']
      },
      set: debounce(value => {
        if (!(value instanceof HTMLElement)) {
          store.dispatch('note/changeTitle', value)
        }
      }, 300)
    })
    const date = computed(() => getFullDate(store.getters['note/getDateUpdate']))

    onMounted(() => {
      if (route.query.new) {
        refTitle.value.focus()
      }
    })

    return {title, date, refTitle}
  }
}
</script>

<style scoped>
small.form__error {
  display: block;
}
.form__control {
  border-color: transparent;
  padding: 1px;
  width: 50%;
}
</style>
