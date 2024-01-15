<template>
  <li :class="{ active }"
      class="nav-item">

    <RouterLink class="nav-link"
                :to="route">
      <span class="nav-link-icon d-md-none d-lg-inline-block">
        <component :is="icon"
                   class="icon" />
      </span>
      <span class="nav-link-title">
        {{ name }}
      </span>
    </RouterLink>
  </li>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  icon: {
    type: [Object, String, Function],
    required: true,
  },

  route: {
    type: Object,
    required: true,
  },

  exact: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const active = computed(() => {
  const currentRoute = router.currentRoute.value;

  if (props.exact) {
    return router.resolve(props.route).href === currentRoute.href;
  }

  return router.resolve(props.route).href.startsWith(currentRoute.href);
});
</script>