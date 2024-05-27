import { SwitchTextProps } from '/@/model/index';

export function useSwitchText(options: SwitchTextProps) {
  let startSwitchTime = 0,
    prevShowTime = 0,
    frameId = 0,
    index = options.start.length > 0 ? 0 : -1;

  const text = ref<string>(index === -1 ? options.end : options.start[index] || '');
  const start = () => {
    const now = new Date().getTime();
    startSwitchTime = now;
    prevShowTime = now;
    frameId = requestAnimationFrame(loop);
  };
  const restart = () => {
    cancelAnimation();
    index = 0;
    text.value = options.start[0];
    start();
  };
  const loop = () => {
    const now = new Date().getTime();
    // 超出结束时间
    if (now - startSwitchTime >= options.duration!) {
      text.value = options.end;
      index = -1;
      prevShowTime = now;
    } else if (now - prevShowTime >= options.interval!) {
      let nextIndex = index === -1 ? 0 : index + 1;
      // 超出需要检索的数组长度
      if (nextIndex >= options.start.length) {
        nextIndex = 0;
      }
      text.value = options.start[nextIndex];
      index = nextIndex;
      prevShowTime = now;
    }

    frameId = requestAnimationFrame(loop);
  };

  function cancelAnimation() {
    frameId && cancelAnimationFrame(frameId);
  }

  onUnmounted(cancelAnimation);

  return {
    start,
    restart,
    loop,
    text,
  };
}
