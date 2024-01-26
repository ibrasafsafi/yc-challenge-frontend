<template>

  <div class="mb-3">
    <div class="form-label">Categories</div>
    <select class="form-select" :class="inputClasses" multiple>
      <option v-for="item in options" :key="item.id"
              @click="addItem(item)">
        {{ item.name }}
      </option>
    </select>

    <div class="invalid-feedback">
      <div v-for="(error, index)  in errors"
           :key="`error-${index}`">
        {{ error }}
      </div>
    </div>

    <span class="mt-3 fw-bold">Selected Categories: </span>
    <span v-for="item in selectedItems" :key="item.id">
      {{ item.name }},
      <!--      <label class="form-check">-->
      <!--        <input class="form-check-input" type="checkbox" :checked="isSelected(item)">-->
      <!--        <span class="form-check-label">{{ item.name }}</span>-->
      <!--      </label>-->
    </span>
  </div>


</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useResource } from '@/composables/useResource.js';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  invalid: {
    type: Boolean,
  },

  errors: {
    type: Array,
    default: () => [],
  },
});

const {
  fetch,
  data: options,
} = useResource('categories');

const loadOptions = async () => {
  await fetch();
  // options.value = data;

};

const selectedItems = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const addItem = (item) => {
  if (selectedItems.value.includes(item)) {
    selectedItems.value = selectedItems.value.filter(selectedItem => selectedItem.id !== item.id);
  } else {
    selectedItems.value = [...selectedItems.value, item];
  }
};

const isSelected = (item) => {
  return selectedItems.value.includes(item);
};

onMounted(() => {
  loadOptions();
});

const inputClasses = computed(() => {
  return {
    'is-invalid': props.invalid,
  };
});

</script>

<style scoped>

.options-list li {
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.options-list li:last-child {
  border-bottom: none;
}

.options-list label {
  margin-left: 5px;
}
</style>
