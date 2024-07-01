<template>
  <div class="w-full h-full flex justify-center items-center">
    <canvas
      ref="canvasRef"
      width="500"
      class="box rounded-md"
      height="500"></canvas>
  </div>
</template>

<script setup lang="ts">
  class Ball {
    x: any;
    y: any;
    r: any;
    c: any;
    vx: number;
    vy: number;
    constructor(x, y, r, c) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.c = c;
      this.vx = 2; // 默认水平速度
      this.vy = 1; // 默认垂直速度
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = this.c;
      ctx.fill();
    }

    move(w, h) {
      this.x += this.vx;
      this.y += this.vy;
      // 碰撞检测
      if (this.x - this.r <= 0 || this.x + this.r >= w) {
        this.vx = -this.vx;
      }
      if (this.y - this.r <= 0 || this.y + this.r >= h) {
        this.vy = -this.vy;
      }
    }

    // 处理鼠标交互，改变小球速度方向
    handleMouseInteraction(canvas) {
      canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // 根据鼠标位置计算小球速度方向
        this.vx = (mouseX - this.x) / 50; // 调整除数以控制速度灵敏度
        this.vy = (mouseY - this.y) / 50;
      });
    }
  }

  // 初始化画布和上下文
  const canvasRef = ref<HTMLCanvasElement | null>();
  const context = computed(() => canvasRef.value!.getContext('2d')!);
  // 初始化小球
  onMounted(() => {
    const canvas = canvasRef.value!;
    const ball = new Ball(110, 110, 20, 'black');
    // 处理鼠标交互
    ball.handleMouseInteraction(canvas);

    loop();
    function loop() {
      // 先清空画布
      context.value.clearRect(0, 0, canvas.width, canvas.height);

      // 保存状态后再绘制形状
      ball.draw(context.value);

      // 移动形状
      ball.move(canvas.width, canvas.height);

      // 继续下一帧动画
      requestAnimationFrame(loop);
    }
  });
</script>

<style scoped>
  .box1 {
    box-shadow: rgb(0 0 0 / 10%) 0 1px 2px 0;
  }
</style>
