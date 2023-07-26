<!--
 * @Author: DZL
 * @Date: 2023-07-25 22:38:09
 * @LastEditors: DZL
 * @LastEditTime: 2023-07-26 20:49:10
 * @Description: 
-->
<template>
  <div class="px-4 content">
    <div
      sm="px-18 py-12"
      class="relative z-20 flex flex-col items-center p-4 rounded-md box gap-y-4">
      <canvas
        @click="handleClick"
        ref="canvasRef"
        width="500"
        height="500"></canvas>

      <button
        class="button border-none px-15 py-3 rounded-md bg-c_theme/90 text-white font-bold text-base"
        @click="handleCheckout">
        <div class="button__horizontal"></div>
        <div class="button__vertical"></div>
        结算
      </button>
      <pre class="w-full">
        <code class="whitespace-pre-wrap" ref="codeRef" v-html="formattedCode"></code>
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Movie',
  };
</script>

<script setup lang="ts">
  import hljs from 'highlight.js/lib/core';
  import javascript from 'highlight.js/lib/languages/javascript';
  import 'highlight.js/styles/default.css';
  hljs.registerLanguage('javascript', javascript);
  const canvasRef = ref<HTMLCanvasElement | null>();
  const context = computed(() => canvasRef.value!.getContext('2d')!);

  // 电影院座位信息，假设有10行10列
  const rows = 10;
  const cols = 10;
  const seatSize = 40; // 座位的大小
  const seatGap = 10; // 座位之间的间隔

  const seatStatus = ref(new Array(rows).fill(null).map(() => new Array(cols).fill(false)));
  // 绘制电影院座位
  const drawSeats = () => {
    const canvas = canvasRef.value!;
    const ctx = context.value!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * (seatSize + seatGap);
        const y = row * (seatSize + seatGap);

        ctx.fillStyle = seatStatus.value[row][col] ? '#e55743' : '#ccc'; // 根据座位状态设置颜色
        ctx.fillRect(x, y, seatSize, seatSize);

        // ctx.strokeStyle = '#ccc';
        // ctx.strokeRect(x, y, seatSize, seatSize);
      }
    }
  };

  const handleClick = (event) => {
    const canvas = canvasRef.value!;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    const col = Math.floor(x / (seatSize + seatGap));
    const row = Math.floor(y / (seatSize + seatGap));

    seatStatus.value[row][col] = !seatStatus.value[row][col];

    drawSeats();
  };

  interface SeatOptions {
    row: number;
    col: number;
  }
  const checkedSeats = ref<SeatOptions[]>([]);
  const handleCheckout = () => {
    checkedSeats.value = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (seatStatus.value[row][col]) {
          checkedSeats.value.push({ row: row + 1, col: col + 1 });
        }
      }
    }
    formattedCode.value = hljs.highlight('javascript', JSON.stringify(checkedSeats.value, null, 2)).value;
  };

  const formattedCode = ref('');
  const codeRef = ref();
  console.log('formattedCode :>> ', formattedCode);
  onMounted(() => {
    hljs.highlightBlock(codeRef.value);
    drawSeats();
  });
</script>

<style scoped lang="less">
  code.javascript {
    display: block;
    white-space: pre-wrap;
  }

  .button {
    --offset: 8px;
    --border-size: 2px;

    display: block;
    position: relative;
    appearance: none;
    background: transparent;
    color: #e55743;
    text-transform: uppercase;
    outline: none;
    cursor: pointer;
    font-weight: bold;
    border-radius: 0;
    box-shadow: inset 0 0 0 var(--border-size) currentcolor;
    transition: background 0.8s ease;

    &:hover {
      background: rgba(100, 0, 0, 0.03);
    }

    &__horizontal,
    &__vertical {
      position: absolute;
      top: var(--horizontal-offset, 0);
      right: var(--vertical-offset, 0);
      bottom: var(--horizontal-offset, 0);
      left: var(--vertical-offset, 0);
      transition: transform 0.8s ease;
      will-change: transform;

      &::before {
        content: '';
        position: absolute;
        border: inherit;
      }
    }

    &__horizontal {
      --vertical-offset: calc(var(--offset) * -1);
      border-top: var(--border-size) solid currentcolor;
      border-bottom: var(--border-size) solid currentcolor;

      &::before {
        top: calc(var(--vertical-offset) - var(--border-size));
        bottom: calc(var(--vertical-offset) - var(--border-size));
        left: calc(var(--vertical-offset) * -1);
        right: calc(var(--vertical-offset) * -1);
      }
    }

    &:hover &__horizontal {
      transform: scaleX(0);
    }

    &__vertical {
      --horizontal-offset: calc(var(--offset) * -1);
      border-left: var(--border-size) solid currentcolor;
      border-right: var(--border-size) solid currentcolor;

      &::before {
        top: calc(var(--horizontal-offset) * -1);
        bottom: calc(var(--horizontal-offset) * -1);
        left: calc(var(--horizontal-offset) - var(--border-size));
        right: calc(var(--horizontal-offset) - var(--border-size));
      }
    }

    &:hover &__vertical {
      transform: scaleY(0);
    }
  }
</style>
