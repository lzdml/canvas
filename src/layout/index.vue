<template>
  <div
    class="max-w-187.5 mx-auto h-full select-none"
    id="layout-container">
    <div class="h-14 flex items-center">
      <div class="text-xl font-extrabold tracking-wide text-neutral-800 mr-3">{{ title }}</div>
      <div class="flex-1 h-full overflow-x-auto whitespace-nowrap flex items-center gap-x-3 scrollbar scrollbar-h-2 cursor-pointer">
        <div
          class="flex justify-center items-center flex-shrink-0 rounded-md px-8 py-1"
          border="~ solid gray-400/50"
          :class="{ 'bg-c_theme/80 text-white !border-c_theme/80': item.meta?.title === title }"
          @click="handleClick(item)"
          v-for="item in list[0].children"
          :key="item.path">
          {{ item.meta?.title }}
        </div>
      </div>
    </div>
    <div></div>
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
  import { RouteRecordRaw } from 'vue-router';
  import useRouteCache from '/@/hooks/useRouteCache';
  const { caches, collectCaches } = useRouteCache();
  collectCaches();

  const route = useRoute();
  const title = ref('');
  watch(
    () => route,
    (n) => {
      console.log('n :>> ', n);
      title.value = n.meta?.title as string;
    },
    { immediate: true },
  );

  const router = useRouter();
  const routes = router.options.routes;

  const whiteList = ['/:pathMatch(.*)*'];
  const everyOne = (route) => whiteList.every((item) => item !== route.path);
  const list = ref<RouteRecordRaw[]>(routes.filter((route) => everyOne(route)));
  console.log('list :>> ', list);

  const handleClick = (item) => {
    if (item.path === route.path) {
      return;
    }
    console.log('item :>> ', item);
    title.value = item.meta.title;
    router.push(item.path);
  };
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
