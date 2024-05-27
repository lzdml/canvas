export const sleep = (delay = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

type DebounceFn<T extends any[]> = (...args: T) => void;

export function debounce<T extends any[]>(func: DebounceFn<T>, delay: number): DebounceFn<T> {
  let timerId: ReturnType<typeof setTimeout>;

  return function (...args: T) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const isValidEmail = (email: string) => {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
};

/**
 * 获取字符串的宽度
 * @param text 被提取的原字符串
 * @param fontSize 字体大小 支持 >= 12
 * @param fontWeight 字体粗细
 */
export function getTextWith(text: string, fontSize: number, fontWeight = 400) {
  const span = document.createElement('span') as HTMLSpanElement;
  span.style.visibility = 'hidden';
  span.style.padding = '0';
  span.style.whiteSpace = 'nowrap';
  span.style.overflow = 'visible';
  span.style.fontSize = `${fontSize > 12 ? fontSize : 12}px`;
  span.style.fontWeight = `${fontWeight}`;
  span.innerText = text;
  document.body.appendChild(span);
  const width = span.getBoundingClientRect().width;
  document.body.removeChild(span);
  return width;
}

/**
 * 获取固定宽度的字符串, 如果传入的text的宽度不够width, 则返回原字符串
 * @param text 被提取的原字符串
 * @param width 字符串的宽度
 * @param fontSize 字体大小 支持 >= 12
 * @param fontWeight 字体粗细
 * @param ellipsis 是否显示省略号, 当text的宽度大于width时, 在会传入的text后面添加省略号, 最后返回的字符串宽度会大于width
 */
export function getFixedWidthText(text: string, width: number, fontSize = 12, fontWeight = 400, ellipsis = true) {
  let returnText = '',
    oldText = '',
    newText = '';

  if (!text || fontSize > width || typeof text !== 'string') return text;
  const arr = text.split('');
  const span = document.createElement('span') as HTMLSpanElement;
  span.style.visibility = 'hidden';
  span.style.padding = '0';
  span.style.whiteSpace = 'nowrap';
  span.style.overflow = 'visible';
  span.style.fontSize = `${fontSize > 12 ? fontSize : 12}px`;
  span.style.fontWeight = `${fontWeight}`;
  document.body.appendChild(span);

  for (let i = 0, l = arr.length; i < l; i++) {
    const item = arr[i];
    oldText = newText;
    newText += item;
    returnText = newText;
    span.innerText = newText;
    const nowWidth = span.offsetWidth;
    if (nowWidth > width) {
      if (ellipsis) {
        returnText = oldText + '...';
      } else {
        returnText = oldText;
      }
      break;
    }
  }
  document.body.removeChild(span);
  return returnText;
}

export function isIpadFun() {
  const ua = window.navigator.userAgent;
  let IsIPad = false;
  if (/ipad/i.test(ua)) {
    IsIPad = true;
  }
  // iPad from IOS13
  const macApp = ua.match(/Macintosh/i) != null;
  if (macApp) {
    // need to distinguish between Macbook and iPad
    const canvas = document.createElement('canvas');
    if (canvas != null) {
      const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (context) {
        const info = (context as any).getExtension('WEBGL_debug_renderer_info');
        if (info) {
          const renderer = (context as any).getParameter(info.UNMASKED_RENDERER_WEBGL);
          if (renderer.indexOf('Apple') != -1) IsIPad = true;
        }
      }
    }
  }
  return IsIPad;
}

export function isMobileDevice() {
  return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);
}

export function getCurrentTime(format = 'yyyy-MM-dd hh:mm:ss', now = new Date()) {
  const year = now.getFullYear();
  const month = ('' + (now.getMonth() + 1)).padStart(2, '0');
  const day = ('' + now.getDate()).padStart(2, '0');
  const hours = ('' + now.getHours()).padStart(2, '0');
  const minutes = ('' + now.getMinutes()).padStart(2, '0');
  const seconds = ('' + now.getSeconds()).padStart(2, '0');

  return format
    .replace('yyyy', year + '')
    .replace('MM', month)
    .replace('dd', day)
    .replace('hh', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}
