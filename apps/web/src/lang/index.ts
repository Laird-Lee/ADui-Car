import { createI18n } from 'vue-i18n';
import en from './en';
import zh from './zh';
import { useLocaleStore } from '@/stores/locale.store';
import { createPinia } from 'pinia';

const pinia = createPinia();
const { locale } = useLocaleStore(pinia);

const messages = { en, zh };
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale,
  messages
});

export default i18n;
