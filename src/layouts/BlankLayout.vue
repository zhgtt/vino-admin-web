<template>
  <RouterView #default="{ Component, route }">
    <div :class="['vino-blank-layout-container', 'relative w-full bg-transparent']">
      <component :is="Component" :key="route.fullPath" />
    </div>
  </RouterView>
</template>

<style lang="scss">
.vino-blank-layout-container {
}
</style>
