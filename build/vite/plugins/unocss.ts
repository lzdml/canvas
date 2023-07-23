/**
 * @name ConfigUnocssPlugin
 * @description 监听配置文件修改自动重启Vite
 */

// Unocss
import Unocss from 'unocss/vite';
import { presetScrollbar } from 'unocss-preset-scrollbar';

export const ConfigUnocssPlugin = () => {
  return Unocss({
    presets: [presetScrollbar()],
  });
};
