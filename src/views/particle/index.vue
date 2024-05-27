<template>
  <div
    sm="px-18 py-12"
    class="relative z-20 flex flex-col items-center box1 p-4 gap-y-4">
    <div>
      <span>点击粒子个数</span>
      <input
        class="px-4 py-3 rounded-md w-80 text-base"
        type="number"
        v-model="num"
        :max="maxNum"
        placeholder="点击粒子个数" />
    </div>
    <div>
      <span>画布最多粒子个数(最大1000)</span>
      <input
        class="px-4 py-3 rounded-md w-80 text-base"
        type="text"
        v-model="maxNum"
        :min="num * 2"
        placeholder="画布最多粒子个数" />
    </div>

    <!-- <div>
      <button
        @click="resetCanvas"
        class="btn">
        清空画布
      </button>
    </div> -->
    <canvas
      ref="canvasRef"
      :style="{
        width: width + 'px',
        height: height + 'px',
      }"
      class="box rounded-md"></canvas>
  </div>
</template>

<script setup lang="ts">
  import { CANVAS } from '/@/config/index';

  const { width, height } = CANVAS;

  const canvasRef = ref<HTMLCanvasElement | null>();
  const ctx = computed(() => canvasRef.value!.getContext('2d')!);
  const particles = ref<Particle[]>([]);

  const num = ref(10);
  const maxNum = ref(200);

  watch(
    () => num.value,
    (n) => {
      if (n >= maxNum.value) {
        num.value = Math.floor(maxNum.value);
      }
    },
  );

  watch(
    () => maxNum.value,
    (n) => {
      if (Math.floor(n) > 1000) {
        maxNum.value = 1000;
      }
    },
  );

  class Particle {
    x: number;
    y: number;
    radius: number;
    color: string;
    speedX: number;
    speedY: number;
    canvasRef: HTMLCanvasElement | undefined;

    constructor({ x, y, radius, color, speedX, speedY }) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.speedX = speedX;
      this.speedY = speedY;
    }

    draw() {
      ctx.value.beginPath();
      ctx.value.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.value.closePath();
      ctx.value.fillStyle = this.color;
      ctx.value.fill();
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if ((this.x - this.radius < 0 || this.x + this.radius >= width) && Math.random() > 0.1) {
        this.speedX *= -1;
      }
      if ((this.y - this.radius < 0 || this.y + this.radius >= height) && Math.random() > 0.1) {
        this.speedY *= -1;
      }
    }
  }

  // 调整canvas的宽高
  function resizeCanvas() {
    const canvas = canvasRef.value!;

    canvas.width = width;
    canvas.height = height;
  }

  function getRandomColor() {
    return '#' + Math.random().toString(16).slice(2, 8);
  }

  function getRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function init() {
    for (let i = 0; i < 10; i++) {
      const radius = getRandomFromRange(1, 5);

      const x = getRandomFromRange(radius, width - radius);
      const y = getRandomFromRange(radius, height - radius);
      createParticle(x, y);
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    ctx.value.clearRect(0, 0, width, height);

    particles.value.forEach((particle) => {
      particle.draw();
      particle.update();
    });

    limitParticlesInView(Math.floor(maxNum.value) >= 1000 ? 1000 : Math.floor(maxNum.value));
  }

  function createParticle(x: number, y: number, speedCoefficient = 2) {
    const radius = getRandomFromRange(1, getRandomFromRange(3, 7));
    const color = getRandomColor();

    const speedX = (Math.random() - 0.5) * speedCoefficient;
    const speedY = (Math.random() - 0.5) * speedCoefficient;
    particles.value.push(new Particle({ x, y, radius, color, speedX, speedY }));
  }

  function handleClick(event) {
    const x = event.clientX;
    const y = event.clientY;
    const rect = canvasRef.value!.getBoundingClientRect();

    const mouseX = x - rect.left;
    const mouseY = y - rect.top;
    const speedCoefficient = 4;
    for (let i = 0; i < num.value; i++) {
      createParticle(mouseX, mouseY, speedCoefficient * speedCoefficient);
    }
  }

  function limitParticlesInView(maxParticles) {
    const particlesInView = particles.value.filter((particle) => {
      return particle.x > 0 && particle.x < width && particle.y > 0 && particle.y < height;
    });

    if (particlesInView.length > maxParticles) {
      // 超过限制时删除多余的粒子
      particles.value.splice(maxParticles, particlesInView.length - maxParticles);
    }
  }

  // 监听浏览器窗口大小变化
  onMounted(() => {
    window.addEventListener('resize', resizeCanvas);
    canvasRef.value?.addEventListener('click', handleClick);

    resizeCanvas();
    init();
    animate();
  });
</script>

<style scoped></style>
