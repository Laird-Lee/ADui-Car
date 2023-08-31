import { ref, watch } from 'vue';

export function useSessionStorage<T>(key: string, initialValue?: T) {
  const storedValue = sessionStorage.getItem(key);
  const value = ref<T>(storedValue !== null ? JSON.parse(storedValue) : initialValue);

  watch(value, () => {
    sessionStorage.setItem(key, JSON.stringify(value.value));
  });

  return value;
}
