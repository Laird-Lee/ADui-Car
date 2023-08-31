import { defineStore } from 'pinia';
import { useLocalStorage } from '@/hooks';
import dayjs from 'dayjs';

export const useLocaleStore = defineStore(
  'locale',
  () => {
    const originLocale = ref<string>('zh');
    const locale = computed(() => originLocale.value);
    function setLocale(lang: string) {
      originLocale.value = lang;
      // const storage = useLocalStorage<string>('locale', 'zh');
      // storage.value = lang;
      dayjs.locale(lang ? (lang === 'en' ? lang : 'zh-cn') : 'zh-cn');
    }
    return { originLocale, locale, setLocale };
  },
  {
    persist: true
  }
);
