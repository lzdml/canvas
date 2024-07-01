<template>
  <div
    class="watermark-container relative"
    ref="parentRef">
    <slot></slot>
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
  import useWatermarkBg from './useWatermarkBg';
  const props = defineProps({
    text: {
      type: String,
      required: true,
      default: 'watermark',
    },
    fontSize: {
      type: Number,
      default: 40,
    },
    gap: {
      type: Number,
      default: 20,
    },
    color: {
      type: String,
      default: 'red',
    },
  });
  const bg = useWatermarkBg(props);
  const parentRef = ref(null);
  const flag = ref(0); // 声明一个依赖
  let div;
  watchEffect(() => {
    flag.value; // 将依赖放在 watchEffect 里
    if (!parentRef.value) {
      return;
    }
    if (div) {
      div.remove();
    }
    const { base64, styleSize } = bg.value;
    div = document.createElement('div');
    div.style.backgroundImage = `url(${base64})`;
    div.style.backgroundSize = `${styleSize}px ${styleSize}px`;
    div.style.backgroundRepeat = 'repeat';
    div.style.zIndex = 9999;
    div.style.position = 'absolute';
    div.style.inset = 0;
    parentRef.value.appendChild(div);
  });
  let ob;
  onMounted(() => {
    ob = new MutationObserver((records) => {
      for (const record of records) {
        for (const dom of record.removedNodes) {
          if (dom === div) {
            flag.value++; // 删除节点的时候更新依赖
            return;
          }
        }
        if (record.target === div) {
          flag.value++; // 修改属性的时候更新依赖
          return;
        }
      }
    });
    ob.observe(parentRef.value, {
      childList: true,
      attributes: true,
      subtree: true,
    });
  });

  onUnmounted(() => {
    ob && ob.disconnect();
    div = null;
  });
</script>
