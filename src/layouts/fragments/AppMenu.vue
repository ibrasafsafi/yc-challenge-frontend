<template>
  <header class="navbar navbar-expand-md d-print-none">
    <div class="container-xl">
      <button class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar-menu"
              aria-controls="navbar-menu"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
        <a href=".">
          <img src="https://preview.tabler.io/static/logo.svg"
               width="110"
               height="32"
               alt="Tabler"
               class="navbar-brand-image">
        </a>
      </h1>
      <div class="navbar-nav flex-row order-md-last">
        <div class="nav-item dropdown">
          <a href="#"
             class="nav-link d-flex lh-1 text-reset p-0"
             data-bs-toggle="dropdown"
             aria-label="Open user menu">
            <div class="d-none d-xl-block ps-2">
              <div>{{ user.name }}</div>
              <div class="mt-1 small text-secondary">
                {{ user.email }}
              </div>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <button @click="handleLogout"
                    class="dropdown-item">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <header class="navbar-expand-md">
    <div class="navbar-collapse collapse"
         id="navbar-menu"
         style="">
      <div class="navbar">
        <div class="container-xl">
          <div class="row flex-fill align-items-center">
            <div class="col">
              <ANavbar :items="links" />
            </div>
            <div class="col-2 d-none d-xxl-block">
              <div class="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                <form action="./"
                      method="get"
                      autocomplete="off"
                      novalidate="">
                  <div class="input-icon">
                    <span class="input-icon-addon">
                      <!-- Download SVG icon from http://tabler-icons.io/i/search -->
                      <svg xmlns="http://www.w3.org/2000/svg"
                           class="icon"
                           width="24"
                           height="24"
                           viewBox="0 0 24 24"
                           stroke-width="2"
                           stroke="currentColor"
                           fill="none"
                           stroke-linecap="round"
                           stroke-linejoin="round">
                        <path stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"></path>
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                        <path d="M21 21l-6 -6"></path>
                      </svg>
                    </span>
                    <input type="text"
                           value=""
                           class="form-control"
                           placeholder="Search…"
                           aria-label="Search in website">
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';

import { useAuthStore } from '../../stores/auth';
import { IconBrandProducthunt } from '@tabler/icons-vue';
import ANavbar from '../../components/navbar/ANavbar.vue';
import { api } from '@/boot/api';
import { useRouter } from 'vue-router';

const links = [
  {
    name: 'Products',
    icon: IconBrandProducthunt,
    route: { name: 'products.index' },
  },
];

const authStore = useAuthStore();

const router = useRouter();

const user = computed(() => {
  return authStore.user ?? {};
});

const handleLogout = () => {
  if (!confirm("Are you sure you want to logout?")) return;

  api.post('/logout')
    .then(() => {
      router.replace({ name: 'login' });
    });
}
</script>