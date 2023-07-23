import { LocationQuery } from 'vue-router';

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

export function timestampToStandardDateTime(timestamp) {
  if (typeof timestamp === 'string') {
    timestamp = parseInt(timestamp);
  }
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * @param {string} path
 * @description useStaticImgUrl('/@/assets/images/....png')
 */
export const useStaticImgUrl = (path: string, prefix = 'jpg') => {
  return new URL(`../assets/images/${path}.${prefix}`, import.meta.url).href;
};

export function getOtherQuery(query: LocationQuery) {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur];
    }
    return acc;
  }, {} as LocationQuery);
}
