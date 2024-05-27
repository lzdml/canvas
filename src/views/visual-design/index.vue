<template>
  <div
    sm="px-18 py-12"
    lg="grid-cols-2"
    class="relative z-20 box1 p-4 gap-y-4 grid grid-cols-1">
    <div class="flex flex-col justify-center items-center">
      <button
        @click="restartSwitch('visualDeisgnRef')"
        class="border-none px-4 py-3 rounded-md font-bold"
        v-waves>
        点击开始
      </button>
      <switchText
        ref="visualDeisgnRef"
        :start="VISUAL_DESIGN.demo1.start"
        :end="VISUAL_DESIGN.demo1.end"
        :duration="2000" />
    </div>

    <div class="flex flex-col justify-center items-center">
      <div
        class="box border-10 border-solid border-gray-2 rounded-xl"
        ref="boxRef1"
        :style="{ width: `${CANVAS.width}px`, height: `${CANVAS.height}px` }">
        <canvas
          ref="canvasRef1"
          style="width: 100%; height: 100%"></canvas>
      </div>
    </div>

    <div class="flex flex-col justify-center items-center">
      <div
        class="box border-10 border-solid border-gray-2 rounded-xl"
        ref="boxRef"
        :style="{ width: `${CANVAS.width}px`, height: `${CANVAS.height}px` }">
        <canvas
          ref="canvasRef2"
          data-ref="canvasRef2"
          style="width: 100%; height: 100%"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import switchText from './components/switch-text.vue';
  import type { SwitchTextRef } from './components/switch-text.vue';
  import { CANVAS, VISUAL_DESIGN } from '/@/config/index';

  interface Point {
    x: number;
    y: number;
  }

  interface DrawGridOptions {
    lineWidth: number; // 线宽
    lineColor: string; // 线颜色
    lineDash: number[]; // 虚线
    gap: number; // 线间距
  }

  const visualDeisgnRef = ref<SwitchTextRef>();
  const handles = { visualDeisgnRef };
  const restartSwitch = (refName: string) => {
    handles[refName].value.restart();
  };

  onMounted(() => {});
  const { play1, resizeCanvas: resizeCanvas1, canvasRef1 } = usePlay1();
  onMounted(() => {
    resizeCanvas1();
    play1({ x: 0, y: 0 }, 50, 8, 90);
  });

  function usePlay1() {
    const canvasRef1 = ref<HTMLCanvasElement | null>(null);
    const ctx = computed(() => canvasRef1.value!.getContext('2d')!);
    function play1(pos: Point, len: number, thick: number, angle: number) {
      if (thick < 2 && Math.random() < 0.6) {
        // 画一个圆
        ctx.value.beginPath();
        ctx.value.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
        ctx.value.fillStyle = '#333';
        ctx.value.fill();
        return;
      }
      if (thick < 0.5) {
        return;
      }
      const { x, y } = pos;
      ctx.value.beginPath();
      ctx.value.moveTo(x, y);
      const pos1 = {
        x: pos.x + len * Math.cos((angle * Math.PI) / 180),
        y: pos.y + len * Math.sin((angle * Math.PI) / 180),
      };
      ctx.value.lineTo(pos1.x, pos1.y);
      ctx.value.strokeStyle = '#333';
      ctx.value.lineCap = 'round';
      ctx.value.lineWidth = thick;
      ctx.value.stroke();

      play1(pos1, len * 0.9, thick * 0.8, angle + Math.random() * 40);
      play1(pos1, len * 0.9, thick * 0.8, angle - Math.random() * 40);
    }
    function resizeCanvas() {
      if (canvasRef1.value) {
        const scale = window.devicePixelRatio;
        canvasRef1.value!.width = scale * canvasRef1.value!.clientWidth;
        canvasRef1.value!.height = scale * canvasRef1.value!.clientHeight;
        ctx.value.translate(CANVAS.width / 2, CANVAS.height);
        ctx.value.scale(1, -1);
      }
    }

    return {
      play1,
      canvasRef1,
      resizeCanvas,
      ctx,
    };
  }

  function resizeCanvas(instance: HTMLCanvasElement) {
    if (instance) {
      const scale = window.devicePixelRatio;
      instance.width = scale * instance.clientWidth;
      instance.height = scale * instance.clientHeight;
    }
  }

  const { canvasRef2, initLaunch, transformCanvasOrigin, drawGrid } = usePlay2();
  onMounted(() => {
    resizeCanvas(canvasRef2.value!);
    transformCanvasOrigin(canvasRef2.value!.width / 2, canvasRef2.value!.height / 2, 1, -1);
    drawGrid({
      lineWidth: 1,
      lineColor: '#433',
      lineDash: [5, 10],
      gap: 10,
    });
    const launchInfo = {
      x: 0,
      y: 0,
      color: '#333',
      r: 10,
    };
    // initLaunch({ x: launchInfo.x, y: launchInfo.y }, launchInfo.r, launchInfo.color, false);
  });
  function usePlay2() {
    const canvasRef2 = ref<HTMLCanvasElement | null>(null);
    const ctx = computed(() => canvasRef2.value!.getContext('2d')!);
    const rect = reactive({
      width: CANVAS.width,
      height: CANVAS.height,
    });

    onMounted(() => {
      rect.width = canvasRef2.value!.clientWidth;
      rect.height = canvasRef2.value!.clientHeight;
    });
    function transformCanvasOrigin(w = 0, h = 0, sx = 1, sy = -1) {
      ctx.value.translate(w, h);
      ctx.value.scale(sx, sy);
    }

    function drawGrid(drawOptions: DrawGridOptions, useX = true, useY = true, useOrign = true) {
      const { lineWidth, lineColor, lineDash, gap } = drawOptions;
      if (useOrign) {
        ctx.value.beginPath();
        ctx.value.arc(0, 0, 5, 0, 2 * Math.PI);
        ctx.value.fillStyle = lineColor;
        ctx.value.fill();
      }
      if (useX) {
        for (let i = 0; i < rect.width / gap; i++) {
          ctx.value.beginPath();
          ctx.value.setLineDash(lineDash);
          ctx.value.lineWidth = lineWidth;
          ctx.value.strokeStyle = lineColor;
          console.log(i * gap);
          const move = {
            x: -rect.width >> 1,
            y: rect.height >> 1,
          };
          const line = {
            x: rect.width / 2,
            y: rect.height / 2,
          };
          ctx.value.moveTo(move.x, move.y);
          ctx.value.lineTo(line.x, line.y);
          ctx.value.stroke();
        }
        // ctx.value.beginPath();
        // ctx.value.setLineDash(lineDash);
        // ctx.value.lineWidth = lineWidth;
        // ctx.value.strokeStyle = lineColor;
        // ctx.value.moveTo(-CANVAS.width / 2, 0);
        // ctx.value.lineTo(CANVAS.width, 0);
        // ctx.value.stroke();
      }
      if (useY) {
        // ctx.value.beginPath();
        // ctx.value.setLineDash(lineDash);
        // ctx.value.lineWidth = lineWidth;
        // ctx.value.strokeStyle = lineColor;
        // ctx.value.moveTo(0, -CANVAS.height / 2);
        // ctx.value.lineTo(0, CANVAS.height);
        // ctx.value.stroke();
      }
    }
    function initLaunch(pos: Point, r: number, color: string, shadow: boolean) {
      const { x, y } = pos;
      ctx.value.beginPath();
      ctx.value.arc(x, y, r, 0, 2 * Math.PI, false);
      if (shadow) {
        ctx.value.shadowBlur = 10;
        ctx.value.shadowColor = color;
      }
      ctx.value.fillStyle = color;
      ctx.value.fill();
      // ctx.value.beginPath();
      // ctx.value.moveTo(0, 50); // Begin first sub-path
      // ctx.value.lineTo(0, 100);
      // ctx.value.moveTo(50, 90); // Begin second sub-path
      // ctx.value.lineTo(280, 120);
      // ctx.value.stroke();
    }

    return {
      canvasRef2,
      transformCanvasOrigin,
      initLaunch,
      drawGrid,
    };
  }
</script>

<style scoped></style>
