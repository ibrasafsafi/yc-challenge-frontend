<template>
  <div class="page">
    <AppMenu />

    <div class="page-wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup>
import AppMenu from './fragments/AppMenu.vue';

</script>