<template>
  <div
    class="max-w-187.5 mx-auto h-full"
    id="layout-container">
    <router-view v-slot="{ Component, route }">
      <transition
        name="fade"
        mode="out-in">
        <keep-alive
          v-if="route.meta.keepAlive"
          :include="caches">
          <component :is="Component" />
        </keep-alive>
        <component
          v-else
          :is="Component"
          :key="route.fullPath" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts" name="Layout">
  import useRouteCache from '/@/hooks/useRouteCache';
  const { caches, collectCaches } = useRouteCache();
  collectCaches();
</script>

<style scoped lang="less">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.28s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  // fade-transform
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.2s;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
