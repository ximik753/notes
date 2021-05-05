<template>
  <div class="add-block">
    <div class="add-block__buttons">
      <button class="btn btn-primary btn-sm">+ todo</button>
      <button class="btn btn-primary btn-sm">+ текст</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppAddBlock'
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/vareables";

.add-block {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 30px;
  opacity: 0;
  transition: all .33s ease;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 15px;
    height: 1px;
    width: 100%;
    background: $gray-300;
    z-index: -1;
  }
  &:hover {
    opacity: 1;
  }
  &__buttons {
    max-width: 150px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > button {
      align-self: center;
    }
  }
}
</style>
