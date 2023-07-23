<template>
  <div
    :class="[{ 'van-hairline--bottom': border, 'fixed left-1/2 transition-transform -translate-x-1/2 top-0': isFixed }, $attrs.class]"
    class="h-11 bg-white w-full flex items-center px-2 max-w-187.5 mx-auto">
    <div
      class="w-8 h-8 flex items-center justify-center"
      @click="goBack">
      <slot
        name="left_slot"
        v-if="showLeft">
        <van-icon
          name="arrow-left"
          size="22"
          color="#06121E" />
      </slot>
    </div>

    <div
      v-if="title"
      class="text-base leading-5.5 text-[#06121e] font-bold flex-1 flex justify-center items-center">
      {{ title }}
    </div>
    <div
      v-if="!title"
      :class="$attrs.contentClass"
      class="flex-1">
      <slot name="content"></slot>
    </div>

    <div class="w-8 h-8 flex items-center justify-center">
      <slot name="right_slot"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      title: string;
      border?: boolean;
      isFixed?: boolean;
      showLeft?: boolean;
    }>(),
    {
      title: '',
      border: true,
      isFixed: true,
      showLeft: true,
    },
  );

  const emit = defineEmits<{
    (e: 'clickLeft'): void;
  }>();

  const goBack = () => {
    emit('clickLeft');
  };
</script>

<style scoped></style>
