import * as PdfJsLib from 'pdfjs-dist';
import { PDFDocumentProxy } from 'pdfjs-dist';
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs';
import { debounce, getCurrentTime, sleep } from '/@/utils/index';

(window as any).pdfjsWorker = pdfjsWorker;
let watermarkInfo = null as HTMLCanvasElement | null;
export function usePdf() {
  let pdfInstance = null as PDFDocumentProxy | null;
  let observer = null as IntersectionObserver | null;

  const pdfRef = ref<Array<HTMLCanvasElement> | null>(null);
  const pdfLibInstance = computed<Readonly<typeof PdfJsLib>>(() => PdfJsLib);
  const pdfPages = ref(0);
  const currentRenderPage = ref(1);
  const pdfOptions = reactive({
    scale: 1, // 设置pdf文件显示比例
  });
  // const needLoadPdfId = ref('body');

  const loadedPdfMap = new WeakMap();

  // 加载pdf
  const loadPdf = async (url: string) => {
    const pdf = await pdfLibInstance.value.getDocument(url).promise;
    const { _pdfInfo } = pdf;
    if (_pdfInfo && _pdfInfo.numPages) {
      pdfPages.value = _pdfInfo.numPages;
    }

    pdfInstance = pdf;
    watermarkInfo = initWatermark();
    return pdf;
  };

  function renderPage(num: number) {
    return new Promise((resolve, reject) => {
      pdfInstance?.getPage(num).then(function (page) {
        if (!pdfRef.value) {
          return reject('canvas画布初始化失败， 请刷新页面后重试');
        }
        const currentPdfElement = pdfRef.value[num - 1];
        const ctx = currentPdfElement.getContext('2d');
        const dpr = window.devicePixelRatio;
        const bsr =
          (ctx as any).webkitBackingStorePixelRatio ||
          (ctx as any).mozBackingStorePixelRatio ||
          (ctx as any).msBackingStorePixelRatio ||
          (ctx as any).oBackingStorePixelRatio ||
          (ctx as any).backingStorePixelRatio ||
          1;

        const ratio = dpr / bsr;
        const viewport = page.getViewport({ scale: pdfOptions.scale });
        currentPdfElement.width = viewport.width * ratio;
        currentPdfElement.height = viewport.height * ratio;

        currentPdfElement.style.width = `${viewport.width}px`;
        currentPdfElement.style.height = `${viewport.height}px`;
        currentPdfElement.setAttribute('w', `${viewport.width}px`);
        currentPdfElement.setAttribute('h', `${viewport.height}px`);
        ctx?.setTransform(ratio, 0, 0, ratio, 0, 0); // 设置当pdf文件处于缩小或放大状态时，可以拖动
        page.render({
          canvasContext: ctx as CanvasRenderingContext2D,
          viewport: viewport,
        });

        resolve(page);
      });
    });
  }

  /**
   * 懒加载pdf，防止文件过大导致页面卡死
   * @param page 需要懒加载的页码
   * @param useLazy 是否使用懒加载，默认使用，设置为false，pdf过大会卡死
   * @param isLoadAll 是否加载所有，默认为false
   * @returns
   */
  function lazyPdfLoad(page: number, useLazy = true, isLoadAll = false) {
    return new Promise((resolve, reject) => {
      if (useLazy || isLoadAll) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // 当前需要加载的pdf页面进入视图 并且 没有被加载
              if (entry.isIntersecting && !loadedPdfMap.has(entry.target)) {
                if (!isLoadAll) {
                  console.log('加载加载', currentRenderPage.value);
                  renderPage(currentRenderPage.value)
                    .then(() => {
                      loadedPdfMap.set(entry.target, (entry.target as HTMLCanvasElement).getContext('2d'));
                      addWatermark(currentRenderPage.value);
                      // observer?.unobserve(entry.target);
                      nextTick(() => {
                        currentRenderPage.value += 1;
                      });
                      resolve(page);
                    })
                    .catch((err) => reject(err));
                } else {
                }
              }
            });
          },
          {
            rootMargin: '0px',
            threshold: 1.0,
          },
        );

        observer.observe(pdfRef.value![page - 1]);
      } else {
        currentRenderPage.value += 1;
        const target = pdfRef.value![page - 1];
        renderPage(page)
          .then(() => {
            loadedPdfMap.set(target, (target as HTMLCanvasElement).getContext('2d'));
            observer?.unobserve(target);
            resolve(page);
          })
          .catch((err) => reject(err));
      }
    });
  }

  function initWatermark() {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    ctx!.rotate((-25 * Math.PI) / 180);
    ctx!.font = '20px 仿宋';
    ctx!.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx!.textAlign = 'left';
    ctx!.textBaseline = 'middle';
    ctx!.fillText(`杜兆林-${getCurrentTime('yyyy-MM-dd')}`, 0, 100);
    return canvas;
  }
  const _getRect = (dom: HTMLCanvasElement) => {
    return [dom.getAttribute('width'), dom.getAttribute('height')];
  };
  async function addWatermark(page = 1) {
    await sleep(100);
    page = page > pdfPages.value ? pdfPages.value - 1 : page;
    const currentCanvas = pdfRef.value![page - 1];
    console.log('currentCanvas :>> ', currentCanvas);
    const ctx = currentCanvas && (loadedPdfMap.get(currentCanvas) || currentCanvas.getContext('2d'));
    const pattern = ctx.createPattern(watermarkInfo || initWatermark(), 'repeat');

    const [width, height] = _getRect(currentCanvas);
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = pattern;
    ctx.fill();
  }

  function handleResize() {
    // if (isMobileDevice() || isIpadFun()) {
    //   console.log('移动');
    //   console.log('pdfRef.value :>> ', pdfRef.value);
    //   for (let i = 0; i < pdfRef.value!.length; i++) {
    //     console.log('i', i);
    //     pdfRef.value![i + ''].width = '100%';
    //     pdfRef.value![i + ''].height = 'auto';
    //   }
    // } else {
    //   console.log('pc');
    //   for (let i = 0; i < pdfRef.value!.length; i++) {
    //     const [width, height] = _getRect(pdfRef.value![i]);
    //     pdfRef.value![i + ''].height = height;
    //     pdfRef.value![i + ''].width = width;
    //   }
    // }
  }

  onUnmounted(() => {
    observer?.disconnect();
    window.removeEventListener('resize', debounce(handleResize, 500));
  });

  onMounted(() => {
    window.addEventListener('resize', debounce(handleResize, 500));
  });

  return {
    pdfLibInstance,
    loadPdf,
    pdfPages,
    pdfRef,
    renderPage,
    pdfOptions,
    lazyPdfLoad,
    loadedPdfMap,
    addWatermark,
    // needLoadPdfId,
    currentRenderPage,
  };
}
