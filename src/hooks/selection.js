import {onMounted, reactive, onUnmounted, ref} from 'vue'
import {getElementPosition, SelectionStyles} from '../utils'

export function useSelection() {
  const isSelection = ref(false)
  const isMouseDown = ref(false)
  const selectionStyles = reactive({})
  const selectionPosition = reactive({
    x: Infinity,
    y: Infinity
  })

  onMounted(() => {
    document.addEventListener('selectionchange', selectChangeHandler)
    document.addEventListener('mousedown', mouseDownHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  })

  onUnmounted(() => {
    document.removeEventListener('selectionchange', selectChangeHandler)
    document.removeEventListener('mousedown', mouseDownHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
  })

  const mouseDownHandler = () => isMouseDown.value = true

  const mouseUpHandler = () => isMouseDown.value = false

  const selectChangeHandler = () => {
    const selection = window.getSelection()
    const selectionText = selection.toString().trim()
    isSelection.value = !!selectionText.length

    if (selectionText.length) {
      const {x, y} = getElementPosition(selection.getRangeAt(0).startContainer.parentElement)
      selectionPosition.x = x
      selectionPosition.y = y

      SelectionStyles.forEach(style => {
        selectionStyles[style] = document.queryCommandState(style)
      })
    }
  }

  return {
    isSelection,
    selectionStyles,
    selectionPosition,
    isMouseDown
  }
}
