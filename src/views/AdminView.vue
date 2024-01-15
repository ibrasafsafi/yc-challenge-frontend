<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import AppLayout from '../layouts/AppLayout.vue';
import { api } from '@/boot/api';

defineOptions({
  beforeRouteEnter: (to, from, next) => {
    const authStore = useAuthStore();

    api.get('/user')
      .then(res => {
        authStore.user = res.data.data;
        next();
      }).catch(() => {
        next({ name: 'login' });
      });
  }
})

</script>