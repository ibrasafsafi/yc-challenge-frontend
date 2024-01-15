<template>
  <div class="page page-center">
    <div class="container container-tight py-4">
      <div class="text-center mb-4">
        <a href="."
           class="navbar-brand navbar-brand-autodark">
          <img src="https://preview.tabler.io/static/logo.svg"
               width="110"
               height="32"
               alt="Tabler"
               class="navbar-brand-image">
        </a>
      </div>

      <div class="card card-md">
        <div class="card-body">
          <h2 class="h2 text-center mb-4">Login to your account</h2>

          <form @submit.prevent="login">
            <AInput class="mb-2"
                    type="email"
                    label="Email address"
                    autocomplete="off"
                    placeholder="your@email.com"
                    :invalid="'email' in validation"
                    :errors="validation.email"
                    v-model="credentials.email" />

            <APassword class="mb-2"
                       label="Password"
                       placeholder="Your password"
                       :invalid="'password' in validation"
                       :errors="validation.password"
                       v-model="credentials.password" />

            <ACheckbox class="mb-2"
                       label="Remember me on this device"
                       v-model="credentials.remember" />

            <div class="form-footer">
              <AButton type="submit"
                       variant="primary"
                       :loading="loading"
                       block>
                Sign in
              </AButton>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="text-center text-secondary mt-3">
      Don't have account yet?
      <RouterLink :to="{ name: 'register' }">
        Sign in
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import AButton from '../../components/button/AButton.vue';
import AInput from '../../components/input/AInput.vue';
import APassword from '../../components/password/APassword.vue';
import ACheckbox from '../../components/checkbox/ACheckbox.vue';

import { api } from '@/boot/api';
import { useAuthStore } from '@/stores/auth';

const credentials = ref({
  email: '',
  password: '',
  remember: true,
});

const validation = ref({});

const loading = ref(false);

const router = useRouter();

const authStore = useAuthStore();

const login = async () => {
  loading.value = true;
  validation.value = {};

  await api.get('/sanctum/csrf-cookie');

  api.post('login', credentials.value)
    .then((response) => {
      authStore.user = response.data.data;

      router.push({ name: 'products.index' });
    })
    .catch((err) => {
      if (err.response.status === 422) {
        validation.value = err.response.data.errors;
      }
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>