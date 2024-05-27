<template>
  <div class="w-full h-full select-none">
    <div
      md="block"
      class="hidden fixed top-0 left-0 z-21 max-w-40 h-full bg-gray-100 overflow-y-auto px-4 scrollbar scrollbar-w-2 cursor-pointer py-10">
      <!--   :class="{ 'bg-gray-300 font-bold': item.meta?.title === title }" -->
      <div
        ref="blockRef"
        class="bg-gray-300 font-bold h-11 rounded-md absolute left-1/2 transform -translate-x-1/2 w-[calc(100%-24px)] z-1 transition-all transition-duration-200 ease-in-out"></div>
      <div
        ref="blockRef1"
        class="p-3 rounded-md mb-2 h-11 relative z-2"
        @click="handleClick(item, index)"
        v-for="(item, index) in list[0].children"
        :key="item.path">
        {{ item.meta?.title }}
      </div>
    </div>
    <div
      class="h-full ml-0"
      md="ml-35">
      <router-view v-slot="{ Component }">
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
      title.value = n.meta?.title as string;
    },
    { immediate: true },
  );

  const router = useRouter();
  const routes = router.options.routes;

  const whiteList = ['/:pathMatch(.*)*'];
  const everyOne = (route) => whiteList.every((item) => item !== route.path);
  const list = computed<RouteRecordRaw[]>(() => routes.filter((route) => everyOne(route)));

  const handleClick = (item, index) => {
    if (item.path === route.path) {
      return;
    }
    title.value = item.meta.title;
    initBlockPos(index);
    router.push(item.path);
  };

  const blockRef = ref<HTMLElement | null>(null);
  const blockRef1 = ref<HTMLElement | null>(null);
  function initBlockPos(num = 0) {
    const element = blockRef1.value![num > list.value[0].children!.length - 1 ? list.value[0].children!.length - 1 : num];
    const elementTop = element.offsetTop;
    blockRef.value!.style.top = `${elementTop}px`;
  }
  onMounted(() => {
    const index = list.value[0].children!.findIndex((item) => item.path === (route.path.startsWith('/') ? route.path.substring(1) : route.path));
    initBlockPos(Math.max(0, index));
  });
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
