<template>
  <div class="uppercase content">
    <CustomHeader
      title=""
      :border="false"
      :is-fixed="false"
      :show-left="false"
      class="!bg-transparent h-14">
      <template #content>
        <div class="text-xl font-extrabold tracking-wide text-neutral-800">Emoji Maker</div>
      </template>
      <template #right_slot>
        <div
          class="inline-flex items-center justify-center w-full h-full p-1 transition-opacity opacity-50 cursor-pointer text-neutral-600"
          hover="opacity-100">
          <i
            text-2xl
            i-carbon:sun></i>
        </div>
      </template>
    </CustomHeader>
    <div
      class="px-4"
      sm="px-0">
      <main
        class="relative z-20 flex flex-col items-center p-4 rounded-md box gap-y-4"
        sm="px-18 py-12">
        <div
          class="absolute right-4 top-4 group"
          @click="toggle">
          <div
            class="text-2xl transition-transform text-gray-600/50 i-tabler:menu-2"
            transition="all duration-200 ease-linear"
            group-hover="text-c_theme/20 scale-110"></div>
        </div>
        <div
          class="flex items-center justify-center mt-6 rounded-md w-30 h-30"
          sm="w-50 h-50"
          border="3 solid neutral">
          <canvas ref="canvasRef"></canvas>
        </div>

        <div class="flex items-center py-2 mt-4 gap-x-6">
          <div
            @click="randomEmoji"
            class="text-2xl i-tabler:reload"></div>
          <div
            @click="canvasRef?.toBlob(exportImage)"
            class="flex items-center justify-center px-5 py-3 text-xs font-bold rounded-full cursor-pointer bg-gray-400/20"
            hover="bg-c_theme/80 text-white">
            Export PNG
          </div>
        </div>

        <div
          class="w-full p-4 overflow-x-auto whitespace-nowrap gap-x-3"
          scrollbar="~ h-1 rounded">
          <div
            v-for="(item, v) in targets"
            :class="{ '!bg-c_theme/20': v === activeId }"
            @click="handlerClick(item, v)"
            :key="v"
            class="inline-flex items-center justify-center w-16 h-16 p-1 mx-2 transition-colors rounded-md cursor-pointer bg-gray-400/20"
            hover="bg-c_theme/20">
            <img
              class="w-full h-full"
              :src="useStaticUrl(v, item, '.svg')"
              alt="" />
          </div>
        </div>
        <div class="w-full van-hairline--bottom"></div>

        <div>
          <div
            class="grid grid-cols-5 gap-2 pt-2 auto-rows-max"
            sm="grid-cols-8 gap-3">
            <div
              v-for="(item, v) in filterList"
              :class="{ '!bg-c_theme/20': item == targets[activeId] }"
              @click="selectSinglePart(item)"
              :key="v"
              class="flex items-center justify-center p-1 p-2 transition-colors rounded-md cursor-pointer bg-gray-400/20"
              sm="w-15 h-15"
              hover="bg-c_theme/20">
              <img
                class="w-full h-full"
                :src="useStaticUrl(activeId, item, '.svg')"
                alt="" />
            </div>
          </div>
        </div>

        <transition name="van-slide-left">
          <div
            v-if="showRight"
            class="absolute top-0 w-40 h-full px-2 py-4 overflow-auto bg-white rounded-md scrollbar scrollbar-w-4px gap-y-3 -z-1 box -right-44">
            <arrow
              class="w-full h-34"
              v-for="item in allPositions"
              @click="operate"
              :key="item.id"
              :item="item" />
          </div>
        </transition>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useLoading } from '/@/hooks';
  import Message from '/@/utils/msg';

  interface EmojiOptions {
    fillStyle: string;
    shadowColor: string;
  }

  interface Point {
    x: number;
    y: number;
  }

  // type PositionOptions = Point & {
  //   width: number;
  //   height: number;
  // };

  const message = new Message();
  const { loading: showRight, toggle } = useLoading({ initValue: true });
  const allPositions = [
    {
      id: 2,
      title: '眼睛',
      type: 'eye',
    },
    {
      id: 3,
      title: '眉毛',
      type: 'brow',
    },
    {
      id: 4,
      title: '嘴巴',
      type: 'mouth',
    },
    {
      id: 5,
      title: '动作',
      type: 'action',
    },
  ];

  function adjustValue(type, value) {
    console.log('type, value :>> ', type, value);
    const directions = {
      left: -1,
      up: -1,
      right: 1,
      down: 1,
    };

    const step = directions[type];
    if (step) {
      value += step;
    }

    return value;
  }

  const operate = (item, v) => {
    // console.log('item, v :>> ', item, v);
    // console.log('activeId.value :>> ', activeId.value);

    // const emoji = emojiRef.value!;
    // const options = {
    //   x: adjustValue(v, emoji.canvasPad / 2),
    //   y: adjustValue(v, emoji.canvasPad / 2),
    //   width: emoji.canvas.width - emoji.canvasPad,
    //   height: emoji.canvas.height - emoji.canvasPad,
    // };
    // emoji.ctx.clearRect(0, 0, emoji.canvas.width, emoji.canvas.height);
    // console.log('options :>> ', options);
    // emoji.drawContour(options);

    message.setOption({
      type: 'error',
      message: '功能正在开发中',
    });
  };

  function useStaticUrl(file, image, suffix = '.svg') {
    return new URL(`../../assets/images/${file}/${image}${suffix}`, import.meta.url).href;
  }

  const targets = reactive({
    head: '1',
    eye: '1',
    brow: '1',
    mouth: '1',
    action: '1',
  });

  const menus = reactive({
    head: new Array(8).fill(8).map((_res, i) => 1 + i + ''),
    eye: new Array(26).fill(27).map((_res, i) => 1 + i + ''),
    brow: new Array(6).fill(6).map((_res, i) => 1 + i + ''),
    mouth: new Array(40).fill(40).map((_res, i) => 1 + i + ''),
    action: new Array(22).fill(22).map((_res, i) => 1 + i + ''),
  });

  const positions = reactive({
    head: [],
    eye: [],
    brow: [],
    mouth: [],
    action: [],
  });

  const randomEmoji = () => {
    for (const k in targets) {
      const random = menus[k][getRand(1, menus[k].length - 1)];
      targets[k] = random;
    }
    nextTick(() => {
      emojiRef.value?.ctx.clearRect(0, 0, emojiRef.value.canvas.width, emojiRef.value.canvas.height);
      emojiRef.value!.drawContour({});
    });
  };

  // 生成一个n,m区间的随机数
  const getRand = (n, m) => {
    const r = Math.floor(Math.random() * (m - n + 1) + n);
    return r;
  };

  type TType = keyof typeof targets;
  const handlerClick = (_item, v) => {
    activeId.value = v;
  };

  const exportImage = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emoji_${Date.now()}`;
    a.click();
  };

  const selectSinglePart = (item) => {
    targets[activeId.value] = item;
    emojiRef.value?.ctx.clearRect(0, 0, emojiRef.value.canvas.width, emojiRef.value.canvas.height);
    emojiRef.value!.drawContour({});
  };

  const activeId = ref<TType>('head');
  const filterList = computed(() => menus[activeId.value]);

  const canvasRef = ref<HTMLCanvasElement | null>(null);

  class Emoji {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    radius: number;
    canvasPad: number;
    options: any;
    dpr: number;
    constructor(canvasRef: HTMLCanvasElement, options: EmojiOptions) {
      this.canvas = canvasRef;
      this.canvas.width = 200;
      this.canvas.height = 200;
      this.ctx = this.canvas.getContext('2d')!;
      this.options = options;
      this.dpr = window.devicePixelRatio || 1;
      this.ctx.scale(1, 1);
      this.ctx.fillStyle = options.fillStyle;
      this.canvasPad = 20;
      // 半径
      this.radius = this.canvas.width / 2 - this.canvasPad;
    }

    drawContour({ x = this.canvasPad / 2, y = this.canvasPad / 2, width = this.canvas.width - this.canvasPad, height = this.canvas.height - this.canvasPad }) {
      Promise.all([
        useStaticUrl('head', targets.head),
        useStaticUrl('eye', targets.eye),
        useStaticUrl('mouth', targets.mouth),
        useStaticUrl('action', targets.action),
        useStaticUrl('brow', targets.brow),
      ]).then((images) => {
        images.forEach((image) => {
          image &&
            this.drawImageOnCanvas({
              imageUrl: image,
              x,
              y,
              width,
              height,
            });
        });
      });
    }

    lineTo(p1: Point, p2: Point) {
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
    }

    updateCanvasPad(state) {
      this.canvasPad = state;
    }

    getCanvasCenter() {
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      return {
        centerX,
        centerY,
      };
    }
    /**
     * @description: 圆环阴影
     * @param {number} x 开始绘制的x轴位置
     * @param {number} y 开始绘制的y轴位置
     * @param {number} r 需要绘制的半径长度
     * @param {string} shadowColor 阴影颜色
     * @param {number} shadowBlur 模糊级别，越大越模糊，阴影范围也越大。
     * @param {number} lineWidth 边框越大，阴影越清晰
     * @return {}
     */
    arcInnerShadow({ x, y, r = this.radius, shadowColor = this.options.shadowColor, shadowBlur = 30, lineWidth = 20 }) {
      // 使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存,并在以后的任意时间对其进行恢复（通过 restore() 方法）。
      this.ctx.save();
      this.ctx.beginPath();

      // 裁剪, 只保留内阴影
      this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
      this.ctx.clip();

      this.ctx.beginPath();
      this.ctx.lineWidth = lineWidth;
      this.ctx.shadowBlur = shadowBlur;
      this.ctx.shadowColor = shadowColor;

      this.ctx.arc(x, y, r + lineWidth / 2 + 1, 0, 2 * Math.PI);
      this.ctx.stroke();

      this.ctx.shadowBlur = 0;
      this.ctx.restore();
    }

    drawImageOnCanvas({ imageUrl, x, y, width, height }) {
      const image = new Image();
      image.src = imageUrl;

      image.onload = () => {
        this.ctx.drawImage(image, x, y, width, height);
      };
    }
  }

  const emojiRef = ref<Emoji>();
  onMounted(() => {
    const emoji = new Emoji(canvasRef.value!, {
      fillStyle: '#ffa500',
      shadowColor: 'rgba(240,45,45,0.8)',
    });
    emojiRef.value = emoji;
    emoji.drawContour({});
  });
</script>

<style scoped>
  .box {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
</style>
