<template>
  <div class="grid grid-cols-1 gap-4 px-3 md:grid-cols-2 md:px-6 lg:grid-cols-3 xl:grid-cols-4">
    <demo-block title="useCountDown 倒计时">
      <div>
        <button @click="countDown.start">开始</button>
        <button @click="countDown.pause">暂停</button>
        <button @click="countDown.reset">重置</button>
      </div>
      <div class="h-25 grid grid-cols-4 bg-gray-200">
        <div
          v-for="(value, key) in [current.days, current.hours, current.minutes, current.seconds]"
          :key="key"
          class="relative h-full text-4xl text-white text-center leading-25 bg-black not-last:after:content-[':'] not-last:after:absolute not-last:after:right-0 not-last:after:top-1/2 not-last:after:translate-y-[-50%]">
          {{ value }}
        </div>
      </div>
    </demo-block>
    <demo-block title="useEventListener 监听事件">
      <div>
        <button ref="nativeClickRef2">useEventListener函数点击测试</button>
        <button ref="nativeClickRef">native点击测试</button>
      </div>
    </demo-block>
  </div>
</template>

<script setup lang="ts">
  import { useCountDown } from './useCountDown';
  import { useEventListener } from './useEventListener';

  const countDown = useCountDown({
    time: 24 * 60 * 60 * 1000,
  });
  const { current } = countDown;

  const nativeClickRef = ref<HTMLButtonElement | null>(null);
  const nativeClickRef2 = ref<HTMLButtonElement | null>(null);
  onMounted(() => {
    nativeClickRef.value?.addEventListener('click', (e) => {
      console.log('e :>> ', e);
    });
    useEventListener(
      'click',
      (e) => {
        console.log('e click :>> ', e);
      },
      { target: nativeClickRef2.value! },
    );
  });
</script>

<style scoped></style>
