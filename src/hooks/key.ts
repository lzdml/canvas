export function useKeyPress(key: string | number, callback: () => void) {
  function handleKeyPress(event) {
    if (event[typeof key === 'number' ? 'keyCode' : 'key'] === key) {
      callback();
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyPress);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress);
  });
}
