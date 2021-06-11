import {onMounted, reactive, onUnmounted, ref} from 'vue'
import {SelectionStyles} from '../utils'

export function useSelection() {
  const isSelection = ref(false)
  const selectionStyles = reactive({})
  const selectionPosition = reactive({
    x: Infinity,
    y: Infinity
  })

  onMounted(() => {
    document.addEventListener('selectionchange', selectChangeHandler)
  })

  onUnmounted(() => {
    document.removeEventListener('selectionchange', selectChangeHandler)
  })

  const selectChangeHandler = () => {
    const selection = window.getSelection().toString().trim()
    isSelection.value = !!selection.length

    SelectionStyles.forEach(style => {
      selectionStyles[style] = document.queryCommandState(style)
    })
  }

  const saveStartPosition = e => {
    selectionPosition.x = e.pageX
    selectionPosition.y = e.pageY
  }

  const selectionHandler = e => {
    const selection = window.getSelection().toString().trim()
    if (selection.length) {
      if (selectionPosition.y > e.pageY) {
        saveStartPosition(e)
      }
    }
  }

  return {
    isSelection,
    selectionStyles,
    selectionPosition,
    selectionHandler,
    saveStartPosition
  }
}
