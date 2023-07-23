import { ref, onMounted } from 'vue';

export function useVisibilityChange() {
  const isInPage = ref(true);

  const handleVisibilityChange = () => {
    if (document.visibilityState == 'visible') {
      isInPage.value = true;
    }
    if (document.visibilityState == 'hidden') {
      isInPage.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  });

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  });

  return {
    isInPage,
  };
}
