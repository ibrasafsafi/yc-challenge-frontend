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
          <h2 class="h2 text-center mb-4">Create new account</h2>

          <form @submit.prevent="register">
            <AInput class="mb-2"
                    type="text"
                    label="Name"
                    autocomplete="off"
                    placeholder="Enter name"
                    :invalid="'name' in validation"
                    :errors="validation.name"
                    v-model="data.name" />

            <AInput class="mb-2"
                    type="email"
                    label="Email address"
                    autocomplete="off"
                    placeholder="your@email.com"
                    :invalid="'email' in validation"
                    :errors="validation.email"
                    v-model="data.email" />

            <APassword class="mb-2"
                       label="Password"
                       placeholder="Password"
                       :invalid="'password' in validation"
                       :errors="validation.password"
                       v-model="data.password" />

            <APassword class="mb-2"
                       label="Password Confirmation"
                       placeholder="Password Confirmation"
                       :invalid="'password_confirmation' in validation"
                       :errors="validation.password_confirmation"
                       v-model="data.password_confirmation" />

            <div class="form-footer">
              <AButton type="submit"
                       variant="primary"
                       :loading="loading"
                       block>
                Sign up
              </AButton>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="text-center text-secondary mt-3">
      Already have an account?
      <RouterLink :to="{ name: 'login' }">
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

import { api } from '@/boot/api';
import { useAuthStore } from '../../stores/auth';

const data = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const loading = ref(false);

const validation = ref({});

const router = useRouter();

const authStore = useAuthStore();

const register = async () => {
  loading.value = true;

  validation.value = {};

  await api.get('/sanctum/csrf-cookie');

  api.post('register', data.value)
    .then((response) => {
      authStore.user = response.data.data;

      router.push({ name: 'login' });
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