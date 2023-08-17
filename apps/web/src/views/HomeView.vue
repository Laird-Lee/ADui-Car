<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue';
import { useRequest } from '@/hooks';
import { userApis } from '@/api/user';

const { data, err, loading, http } = useRequest();
onMounted(() => {
  http({ ...userApis.getUserInfoById, params: { id: '23412342134' } });
});
</script>

<template>
  <main>
    <a-alert message="Success Text" type="success" />
    <TheWelcome />
  </main>
</template>
