<!--
 * @Author: DZL
 * @Date: 2023-07-23 13:04:53
 * @LastEditors: DZL
 * @LastEditTime: 2023-07-23 14:27:45
 * @Description: 
-->
<template>
  <div
    class="relative flex items-center justify-center mb-3 w-30 h-30"
    :class="$attrs.class">
    <div
      :class="item"
      class="absolute p-1 rounded-md bg-gray-400/20"
      hover="bg-c_theme/80 text-white"
      v-for="(item, v) in arrows"
      @click="handleClick($props.item, v)"
      :key="item">
      <div class="text-2xl transition-transform i-tabler:arrow-up"></div>
    </div>
    <span :class="$attrs.titleClass">{{ item.title }}</span>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  interface Item {
    id: number;
    title: string;
    type: string;
  }

  defineProps<{
    item: Item;
  }>();

  const arrows = reactive({
    up: 'rotate-0 top-0',
    right: 'rotate-90 right-0',
    down: 'rotate-180 bottom-0',
    left: 'rotate-270 left-0',
  });

  const emit = defineEmits<{
    (e: 'click', item: Item, v: string): void;
  }>();
  const handleClick = (item, v) => {
    emit('click', item, v);
  };
</script>

<style scoped></style>
