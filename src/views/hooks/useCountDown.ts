import { raf, cancelRaf, inBrowser } from '/@/utils/hook-utils';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export type CurrentTime = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  milliseconds: string;
  total: number;
};

export type UseCountDownOptions = {
  time: number;
  millisecond?: boolean;
  onChange?: (current: CurrentTime) => void;
  onFinish?: () => void;
};

function dateFormat(value: number, length = 2) {
  return String(value).padStart(length, '0');
}
function parseTime(time: number): CurrentTime {
  const days = dateFormat(Math.floor(time / DAY));
  const hours = dateFormat(Math.floor((time % DAY) / HOUR));
  const minutes = dateFormat(Math.floor((time % HOUR) / MINUTE));
  const seconds = dateFormat(Math.floor((time % MINUTE) / SECOND));
  const milliseconds = dateFormat(Math.floor(time % SECOND));
  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    total: time,
  };
}

function isSameSecond(time1: number, time2: number): boolean {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}

export function useCountDown(options: UseCountDownOptions) {
  let rafId: number;
  let endTime: number;
  let counting: boolean;
  let deactivated: boolean;

  const remain = ref(options.time);
  const current = computed(() => parseTime(remain.value));

  const pause = () => {
    counting = false;
    cancelRaf(rafId);
  };

  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0);

  const setRemain = (value: number) => {
    remain.value = value;
    options.onChange?.(current.value);

    if (value === 0) {
      pause();
      options.onFinish?.();
    }
  };

  // 毫秒级倒计时
  const microTick = () => {
    rafId = raf(() => {
      if (counting) {
        setRemain(getCurrentRemain());
        if (remain.value > 0) {
          microTick();
        }
      }
    });
  };

  // 秒级倒计时
  const macroTick = () => {
    rafId = raf(() => {
      if (counting) {
        const remainRemain = getCurrentRemain();
        if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
          setRemain(remainRemain);
        }
        if (remain.value > 0) {
          macroTick();
        }
      }
    });
  };

  const tick = () => {
    if (!inBrowser) {
      return;
    }
    if (options.millisecond) {
      microTick();
    } else {
      macroTick();
    }
  };

  const start = () => {
    if (!counting) {
      endTime = Date.now() + remain.value;
      counting = true;
      tick();
    }
  };

  const reset = () => {
    remain.value = options.time;
    pause();
  };

  onBeforeUnmount(pause);
  onActivated(() => {
    if (deactivated) {
      counting = true;
      deactivated = false;
      tick();
    }
  });

  onDeactivated(() => {
    if (counting) {
      pause();
      deactivated = true;
    }
  });

  return {
    current,
    start,
    pause,
    reset,
  };
}
