import store from '../store'
import {debounce} from '../utils'
import {DEFAULT_CHANGE_WAIT} from '../utils/note'

export function useContentBlock() {
  const addComponent = (type, isBefore, blockIdx) => {
    store.commit('note/addComponent', {
      type,
      potion: isBefore ? blockIdx : blockIdx + 1
    })
  }

  const onChange = debounce(async(componentId, value) => {
    await store.dispatch('note/patchData', {
      componentId,
      value
    })
  }, DEFAULT_CHANGE_WAIT)

  return {addComponent, onChange}
}
