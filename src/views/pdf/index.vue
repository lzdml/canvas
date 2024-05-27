<template>
  <div class="w-full h-full">
    <div class="fixed z-10 bg-black text-white p-3">
      <p class="mb-3">当前pdf页数: {{ pdfPages }}</p>
      <p class="mb-3">当前pdf加载完成渲染完的页数: {{ currentRenderPage }}</p>

      <button
        @click="addWatermark(1)"
        class="border-none px-4 py-3 rounded-md font-bold"
        v-waves>
        加盖单页水印
      </button>
    </div>

    <div class="w-full h-full text-center">
      <div
        class="relative"
        :id="`pdf-canvas-parent-${item}`"
        v-for="item in pdfPages"
        :key="item">
        <canvas
          class="mb-6"
          ref="pdfRef"
          :id="`pdf-canvas-${item}`"></canvas>
      </div>
    </div>
    <!-- <Teleport :to="needLoadPdfId">
      <LoadingComp class="absolute left-1/2 top-1/2 -translate-y-1/2" />
    </Teleport> -->
  </div>
</template>

<script setup lang="ts">
  // import LoadingComp from '/@/components/LoadingComp/index.vue';
  import { usePdf } from '/@/hooks/usePdf';
  const { loadPdf, pdfPages, pdfRef, lazyPdfLoad, addWatermark, currentRenderPage } = usePdf();

  const fileName = '/public/files/Test.pdf';

  onMounted(() => {
    loadPdf(fileName).then((res) => {
      const { _pdfInfo, _transport } = res;
      console.log('_pdfInfo, _transport :>> ', _pdfInfo, _transport);
      // renderPage(1);
      for (let i = 0; i < pdfPages.value; i++) {
        lazyPdfLoad(i + 1);
      }
    });
  });
</script>

<style scoped></style>
