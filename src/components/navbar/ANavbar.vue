<template>
  <ul class="navbar-nav">
    <ANavbarItem v-for="(link, index) in items"
                 :key="`link-${index}`"
                 v-bind="link" />
  </ul>
</template>

<script setup>
import ANavbarItem from './ANavbarItem.vue';

defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>