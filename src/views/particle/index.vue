<template>
  <div
    sm="px-18 py-12"
    class="relative z-20 flex flex-col items-center box1 p-4 gap-y-4">
    <canvas
      ref="canvasRef"
      width="700"
      class="box rounded-md"></canvas>
  </div>
</template>

<script setup lang="ts">
  const canvasRef = ref<HTMLCanvasElement | null>();
  const ctx = computed(() => canvasRef.value!.getContext('2d')!);
  const particles = ref<Particle[]>([]);

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

      if ((this.x - this.radius < 0 || this.x + this.radius >= canvasRef.value!.width) && Math.random() > 0.1) {
        this.speedX *= -1;
      }
      if ((this.y - this.radius < 0 || this.y + this.radius >= canvasRef.value!.height) && Math.random() > 0.1) {
        this.speedY *= -1;
      }
    }
  }

  // 调整canvas的宽高
  function resizeCanvas() {
    const canvas = canvasRef.value!;

    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 140;
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

      const x = getRandomFromRange(radius, canvasRef.value!.width - radius);
      const y = getRandomFromRange(radius, canvasRef.value!.height - radius);
      createParticle(x, y);
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    ctx.value.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height);

    particles.value.forEach((particle) => {
      particle.draw();
      particle.update();
    });

    limitParticlesInView(300);
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
    for (let i = 0; i < 10; i++) {
      createParticle(mouseX, mouseY, speedCoefficient * speedCoefficient);
    }
  }

  function limitParticlesInView(maxParticles) {
    const particlesInView = particles.value.filter((particle) => {
      return particle.x > 0 && particle.x < canvasRef.value!.width && particle.y > 0 && particle.y < canvasRef.value!.height;
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

<style scoped>
  .box1 {
    /* box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px; */
  }
</style>
