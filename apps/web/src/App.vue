<script setup lang="ts">
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { useLocaleStore } from '@/stores/locale';

const store = useLocaleStore();
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#67d3d5'
      }
    }"
    :locale="store.locale === 'en' ? enUS : zhCN"
  >
    <router-view />
  </a-config-provider>
</template>

<style scoped></style>
