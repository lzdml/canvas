import { defineStore } from 'pinia';
import piniaStore from '/@/store/index';
import { AppState } from './types';

export const useAppStore = defineStore(
  // 唯一ID
  'app',
  {
    state: () => ({
      theme: '',
    }),
    getters: {},
    actions: {
      updateSettings(partial: Partial<AppState>) {
        this.$patch(partial);
      },

      // Change theme color
      toggleTheme(dark: boolean) {
        if (dark) {
          this.theme = 'dark';
          document.documentElement.classList.add('dark');
        } else {
          this.theme = 'light';
          document.documentElement.classList.remove('dark');
        }
      },
      // Change body is scrolling
      toggleScroll(state: boolean) {
        if (state) {
          document.body.classList.add('!overflow-hidden', 'h-screen');
        } else {
          document.body.classList.remove('!overflow-hidden', 'h-screen');
        }
      },
    },
    persist: [
      {
        key: 'theme',
        storage: localStorage,
        paths: ['theme'],
      },
    ],
  },
);

export function useAppOutsideStore() {
  return useAppStore(piniaStore);
}
