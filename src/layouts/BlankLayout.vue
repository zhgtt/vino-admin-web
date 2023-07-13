<template>
  <RouterView #default="{ Component, route }">
    <transition name="fade-slide" mode="out-in" appear>
      <!-- <keep-alive> -->
      <div :class="['vino-blank-layout-container', 'relative w-full bg-transparent']">
        <component :is="Component" :key="route.fullPath" />
      </div>
      <!-- </keep-alive> -->
    </transition>
  </RouterView>
</template>

<style lang="scss">
.vino-blank-layout-container {
}
</style>
