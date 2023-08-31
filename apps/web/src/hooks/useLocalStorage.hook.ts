import { ref, watch } from 'vue';

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const storedValue = localStorage.getItem(key);
  const value = ref<T>(storedValue !== null ? JSON.parse(storedValue) : initialValue);

  watch(value, () => {
    localStorage.setItem(key, JSON.stringify(value.value));
  });

  return value;
}
