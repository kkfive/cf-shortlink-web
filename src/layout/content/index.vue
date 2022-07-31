<template>
  <div class="container bg-white rounded-lg shadow-xl p-5 mt-4 ml-auto mr-auto">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.container {
  @media (min-width: 1536px) {
    max-width: 1032px;
  }
  @media (min-width: 1280px) {
    max-width: 1032px;
  }
}
</style>
