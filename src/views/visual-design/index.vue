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

    <div class="flex flex-col justify-center items-center">
      <div
        class="box border-10 border-solid border-gray-2 rounded-xl"
        ref="boxRef3"
        :style="{ width: `${CANVAS.width}px`, height: `${CANVAS.height}px` }">
        <canvas
          ref="canvasRef3"
          data-ref="canvasRef3"
          style="width: 100%; height: 100%"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import switchText from './components/switch-text.vue';
  import type { SwitchTextRef } from './components/switch-text.vue';
  import { CANVAS, VISUAL_DESIGN } from '/@/config/index';
  import { getImagePath } from '/@/utils/index';

  const LINE_COLOR = '#a1a1a1';
  const water = getImagePath('water.png');

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
      if (thick < 1.5 && Math.random() < 0.4) {
        // 画一个圆
        ctx.value.beginPath();
        ctx.value.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
        ctx.value.fillStyle = '#333';
        ctx.value.fill();
        return;
      }
      if (thick < 0.1) {
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

      requestAnimationFrame(() => {
        play1(pos1, len * 0.9, thick * 0.8, angle + Math.random() * 40);
      });
      requestAnimationFrame(() => {
        play1(pos1, len * 0.9, thick * 0.8, angle - Math.random() * 40);
      });
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

  const { canvasRef2, draw, transformCanvasOrigin, drawGrid } = usePlay2();
  onMounted(() => {
    resizeCanvas(canvasRef2.value!);
    transformCanvasOrigin(canvasRef2.value!.width / 2, canvasRef2.value!.height / 2, 1, -1);
    drawGrid({
      lineWidth: 1,
      lineColor: LINE_COLOR,
      lineDash: [5, 10],
      gap: 20,
    });

    draw();
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

      canvasRef2.value?.addEventListener('mousemove', moveHandle);
    });
    function transformCanvasOrigin(w = 0, h = 0, sx = 1, sy = -1) {
      ctx.value.save();
      ctx.value.translate(w, h);
      ctx.value.scale(sx, sy);
    }

    function drawLine(moveX, moveY, lineX, lineY, lineWidth = 4, lineColor) {
      ctx.value.moveTo(moveX, moveY);
      ctx.value.lineTo(lineX, lineY);
      ctx.value.lineWidth = lineWidth;
      ctx.value.strokeStyle = lineColor;
      ctx.value.lineCap = 'round';
      ctx.value.stroke();
    }

    function drawGrid(drawOptions: DrawGridOptions, useX = true, useY = true, useOrign = true) {
      const { lineWidth, lineColor, gap } = drawOptions;

      if (useX) {
        for (let i = 0; i < rect.width; i++) {
          ctx.value.beginPath();
          // ctx.value.setLineDash(lineDash);
          ctx.value.lineWidth = lineWidth;
          ctx.value.strokeStyle = lineColor;
          const move = {
            x: -rect.width >> 1,
            y: (rect.height >> 1) - i * gap,
          };
          const line = {
            x: rect.width >> 1,
            y: (rect.height >> 1) - i * gap,
          };
          ctx.value.moveTo(move.x, move.y);
          ctx.value.lineTo(line.x, line.y);
          ctx.value.stroke();
        }
      }
      if (useY) {
        for (let i = 0; i < rect.height; i++) {
          ctx.value.beginPath();
          // ctx.value.setLineDash(lineDash);
          ctx.value.lineWidth = lineWidth;
          ctx.value.strokeStyle = lineColor;
          const move = {
            x: (-rect.width >> 1) + i * gap,
            y: rect.height >> 1,
          };
          const line = {
            x: (-rect.width >> 1) + i * gap,
            y: -rect.height >> 1,
          };
          ctx.value.moveTo(move.x, move.y);
          ctx.value.lineTo(line.x, line.y);
          ctx.value.stroke();
        }
      }
      ctx.value.restore();
    }

    function moveHandle(event) {
      const rect = canvasRef2.value!.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const _distance = (x1, y1, x2, y2) => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      };
      const l = _distance(mouseX, mouseY, rect.width / 2, rect.height / 2);
      const sinValue = Math.sin(Math.abs(mouseY - rect.height / 2) / l);
      const _radianToDegree = (radian) => {
        return radian * (180 / Math.PI);
      };
      const angle = _radianToDegree(Math.asin(sinValue));
      // console.log('angle :>> ', angle);
      // ctx.value.clearRect(0, 0, rect.width, rect.height);
    }

    function draw() {
      ctx.value.save();
      ctx.value.globalCompositeOperation = 'destination-over';
      ctx.value.restore();
    }
    return {
      canvasRef2,
      transformCanvasOrigin,
      drawGrid,
      ctx,
      draw,
    };
  }

  const canvasRef3 = ref<HTMLCanvasElement | null>(null);
  const ctx = computed(() => canvasRef3.value!.getContext('2d')!);
  onMounted(() => {
    resizeCanvas(canvasRef3.value!);
    const cwidth = canvasRef3.value!.width;
    const cheight = canvasRef3.value!.height;
    // ctx.value.fillStyle = 'rgb(200,0,0)';
    // ctx.value.fillRect(25, 25, 100, 100);
    // ctx.value.strokeRect(50, 50, 50, 50);
    // ctx.value.clearRect(55, 55, 40, 40);

    // ctx.value.beginPath();
    // ctx.value.moveTo(75, 50);
    // ctx.value.lineTo(100, 75);
    // ctx.value.lineTo(100, 25);
    // ctx.value.fill();
    // Array.from({ length: 20 }, (_, i) => {
    //   Array.from({ length: 20 }, (v, j) => {
    //     console.log('i, j :>> ', i, j);
    //     unref(ctx).fillStyle = `rgba(${i},${j}, 0)`;
    //     unref(ctx).fillRect(0 + i * 20, 0 + j * 20, cwidth / 20, cheight / 20);
    //     unref(ctx).fill();
    //   });
    // });
    // ctx.value.font = '24px 宋体';
    // ctx.value.textBaseline = 'middle';
    // ctx.value.fillText('杜兆林', 0, 40);
    // ctx.value.strokeText('dd', 20, 60);
    const text = ctx.value.measureText('我又没有溢出');
    console.log('text :>> ', text.width);

    const img = new Image();
    img.src = water;
    img.onload = function () {};
  });
</script>

<style scoped></style>
