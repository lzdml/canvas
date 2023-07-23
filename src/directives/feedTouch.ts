function addActiveClass(el, feedbackClass) {
  if (!!feedbackClass) {
    if (!el.classList.contains(feedbackClass)) {
      el.classList.add(feedbackClass, 'active');
    }
  } else {
    el.classList.add(feedbackClass, 'active');
  }
}

// 触摸结束时移除点击反馈样式
function removeActiveClass(el, feedbackClass) {
  if (el.classList.contains(feedbackClass)) {
    el.classList.remove(feedbackClass, 'active');
  }
}

export default {
  mounted(el, binding) {
    const feedbackClass = binding.value || 'touch-active';

    // 触摸开始时点击反馈样式
    el.addEventListener(
      'touchstart',
      () => {
        addActiveClass(el, feedbackClass);
      },
      { passive: true },
    );
    el.addEventListener(
      'touchend',
      () => {
        removeActiveClass(el, feedbackClass);
      },
      { passive: true },
    );
    el.addEventListener(
      'touchcancel',
      () => {
        removeActiveClass(el, feedbackClass);
      },
      { passive: true },
    );
  },
  unmounted(el, binding) {
    const feedbackClass = binding.value || 'touch-active';
    el.removeEventListener('touchstart', () => {
      addActiveClass(el, feedbackClass);
    });
    el.removeEventListener('touchend', () => {
      removeActiveClass(el, feedbackClass);
    });
    el.removeEventListener('touchcancel', () => {
      removeActiveClass(el, feedbackClass);
    });
  },
};
