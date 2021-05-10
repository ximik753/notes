<template>
  <div class="p-5 position-relative" v-if="$route.query.id && $store.state.note.note">
    <small class="position-absolute text-update" v-if="$store.state.note.updating">
      Обновление данных
      <app-spinner small color="primary"></app-spinner>
    </small>
    <input class="form__control h4" v-model="title" ref="inputTitle" placeholder="Название"/>
    <small class="form__error" v-if="title?.length > 15">Заголовок должен быть меньше 15 символов, сейчас {{title?.length}} символов</small>
    <component
      v-for="(component, index) in components"
      :key="component.id"
      :is="componentsName[index]"
      v-bind="{data: component.data, componentId: component.id, blockIdx: index}"
    ></component>
  </div>
  <div v-else class="position-absolute empty-container">
    <img class="logo" src="../../assets/images/note.png" alt="logo">
    <p class="empty-text">Выберите заметку или создате новую</p>
  </div>
</template>

<script>
import AppContentInput from './blocksContent/AppContentInput'
import AppContentTodo from './blocksContent/todo/AppContentTodo'
import AppSpinner from '../UI/AppSpinner'
import {computed, ref, watch} from 'vue'
import {createInputBlock} from '../../utils/note'
import {debounce} from '../../utils'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'

export default {
  name: 'AppNoteContainer',
  components: {AppSpinner, AppContentInput, AppContentTodo},
  async setup() {
    const route = useRoute()
    const store = useStore()
    const inputTitle = ref(null)

    const fetchNote = async() => {
      await store.dispatch('note/fetch', route.query.id)
    }

    watch(() => route.query.id, async() => {
      await fetchNote()
    })

    watch(() => route.query.new, () => {
      if (route.query.new) {
        inputTitle.value.focus()
      }
    })

    if (route.query.id) {
      await fetchNote()
    }

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
    const componentsName = computed(() => store.getters['note/getData'].map(item => `app-content-${item.type}`))
    const components = computed(() => store.getters['note/getData'] || [createInputBlock()])

    return {
      title,
      componentsName,
      components,
      inputTitle
    }
  }
}
</script>

<style scoped>
.form__control {
  border-color: transparent;
  padding: 1px;
}
.empty-container {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  text-align: center;
}
.text-update {
  top: 15px;
}
small.form__error {
  display: block;
}
</style>
