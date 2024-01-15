<template>
  <div>
    <label class="form-check">
      <input type="checkbox"
             class="form-check-input"
             v-model="internalValue">
      <span class="form-check-label">
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  label: String,

  modelValue: {
    type: [String, Boolean, Number],
  },
});

const internalValue = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
});
</script>