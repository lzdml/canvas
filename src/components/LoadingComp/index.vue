<template>
  <div :class="$attrs.class">
    <div class="relative flex flex-col items-center">
      <div class="animate-bounce-alt animate-count-infinite animate-duration-1s origin-center relative mb-4">
        <div class="origin-center animate-spin animate-duration-2500">
          <div
            class="w-10 h-10 bg-dark/20 opacity-60 rounded-md relative"
            :class="loadClass"></div>
        </div>
      </div>
      <div class="text-[#333333] font-bold">
        <p>{{ loadText }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      loadClass?: string;
      loadText?: string;
    }>(),
    {
      loadClass: '',
      loadText: '加载中',
    },
  );
</script>

<style scoped>
  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading-dot {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #007bff;
    animation: loadingAnimation 0.6s infinite ease-in-out;
  }

  @keyframes loadingAnimation {
    0%,
    100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  }
</style>
