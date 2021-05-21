<template>
  <div class="position-absolute block-control" v-if="totalComponents > 1">
    <app-block-control-button
      v-for="(button, idx) in buttons"
      :key="idx"
      :class-name="button.className"
      :icon="button.icon"
      :on-click="button.onClick"
    ></app-block-control-button>
  </div>
  <app-block-remove-modal
    v-if="show"
    @close="closeModal"
    @remove="removeComponent"
  ></app-block-remove-modal>
</template>

<script>
import AppBlockControlButton from './AppBlockControlButton'
import arrow from '../../../../assets/images/icons/arrow.svg'
import trash from '../../../../assets/images/icons/trash.svg'
import AppBlockRemoveModal from './AppBlockRemoveModal'

export default {
  name: 'AppBlockControl',
  components: {AppBlockRemoveModal, AppBlockControlButton},
  props: {
    blockIdx: {
      required: true,
      type: Number
    },
    totalComponents: {
      required: true,
      type: Number
    },
    componentId: {
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    async removeComponent() {
      await this.$store.dispatch('note/changeComponents', {componentId: this.componentId})
    },
    openModal() {
      this.show = true
    },
    closeModal() {
      this.show = false
    },
    async changePosition(newIdx) {
      if (newIdx !== -1 && newIdx !== this.totalComponents) {
        await this.$store.dispatch('note/changeComponents',
          {
            position: newIdx,
            componentId: this.componentId
          })
      }
    }
  },
  computed: {
    buttons() {
      return [
        {icon: arrow, className: 'arrow-top', onClick: this.changePosition.bind(this, this.blockIdx - 1)},
        {icon: arrow, onClick: this.changePosition.bind(this, this.blockIdx + 1)},
        {icon: trash, onClick: this.openModal}
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/scss/vareables";

.wrapper {
  &:hover .block-control {
    opacity: 1;
  }
}
.block-control {
  right: 30px;
  top: -13px;
  opacity: 0;
  transition: opacity .33s ease;
  box-shadow: 0 2px 5px 2px rgb(60 64 67 / 15%);
  border-radius: 1px;
  background-color: $white;
}
</style>
