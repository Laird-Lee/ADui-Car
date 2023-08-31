<script setup lang="ts">
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { useLocaleStore } from '@/stores/locale.store';
import { useI18n } from 'vue-i18n';

const localesStore = useLocaleStore();
const i18n = useI18n();
onMounted(() => {
  i18n.locale.value = localesStore.locale;
});
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#67d3d5'
      }
    }"
    :locale="localesStore.locale === 'en' ? enUS : zhCN"
  >
    <router-view />
  </a-config-provider>
</template>

<style scoped></style>
