import { ref } from 'vue';

function toggleScroll(state: boolean) {
  const layoutContainer = document.querySelector('#layout-container');
  const content = document.querySelector('.content');
  if (state) {
    (layoutContainer ?? content)!.classList.add('overflow-hidden', 'h-screen');
  } else {
    (layoutContainer ?? content)!.classList.remove('overflow-hidden', 'h-screen');
  }
}

export default function useLoading({ initValue = false }) {
  const loading = ref(initValue);
  const setLoading = (value: boolean) => {
    loading.value = value;
  };

  watch(
    () => loading.value,
    (newVal) => {
      toggleScroll(!!newVal);
    },
  );

  const toggle = () => {
    loading.value = !loading.value;
  };
  return {
    loading,
    setLoading,
    toggle,
  };
}
