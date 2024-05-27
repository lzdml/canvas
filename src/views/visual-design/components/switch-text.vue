<template>
  <div>
    <template v-if="!!text">
      <p class="font-bold text-base p-5 bg-gray-2 mt-6 rounded-md">{{ text }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { useSwitchText } from '/@/hooks';

  interface SwitchTextProps {
    start: string[];
    end: string;
    interval?: number;
    duration?: number;
  }

  export interface SwitchTextRef {
    restart: () => void;
  }

  const props = withDefaults(defineProps<SwitchTextProps>(), {
    interval: 60,
    duration: 1000,
  });

  const { restart, text } = useSwitchText(props);

  defineExpose({ restart });
</script>

<style scoped></style>
