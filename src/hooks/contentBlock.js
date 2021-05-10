import store from '../store'
import {debounce} from '../utils'

export function useContentBlock() {
  const addComponent = (type, isBefore, blockIdx) => {
    store.commit('note/addComponent', {
      type,
      potion: isBefore ? blockIdx : blockIdx + 1
    })
  }

  const onChange = debounce(async(nodeId, value) => {
    await store.dispatch('note/patchData', {
      nodeId,
      value
    })
  }, 300)

  return {addComponent, onChange}
}
