<template>
  <AInput :type="type">
    <template #append>
      <component :is="icon"
                 @click="toggle"
                 class="icon cursor-pointer" />
    </template>
  </AInput>
</template>

<script setup>
import AInput from '../input/AInput.vue';
import { ref, computed } from 'vue';
import { IconEyeOff, IconEye } from '@tabler/icons-vue';

const visible = ref(false);

const toggle = () => {
  visible.value = !visible.value;
}

const icon = computed(() => {
  if (visible.value) return IconEyeOff;

  return IconEye;
});

const type = computed(() => {
  if (visible.value) return 'text';

  return 'password';
});
</script>