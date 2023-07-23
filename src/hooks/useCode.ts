export default function useCode() {
  const isStart = ref(false);
  const COUNT_TIME = 60;

  const currentCount = ref(COUNT_TIME);
  let timeId: ReturnType<typeof setInterval> | null;

  const getButtonText = computed(() => {
    return !unref(isStart) ? '获取验证码' : `${unref(currentCount)}s`;
  });

  function clear() {
    timeId && window.clearInterval(timeId);
  }

  function stopDown() {
    isStart.value = false;
    clear();
    timeId = null;
  }

  async function startDown() {
    if (unref(isStart) || !!timeId) {
      return;
    }

    isStart.value = true;
    timeId = setInterval(() => {
      if (unref(currentCount) <= 1) {
        stopDown();
        currentCount.value = COUNT_TIME;
      } else {
        currentCount.value -= 1;
      }
    }, 1000);
  }

  return {
    startDown,
    clear,
    getButtonText,
    isStart,
  };
}
