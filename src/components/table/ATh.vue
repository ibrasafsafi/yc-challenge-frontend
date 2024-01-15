<template>
  <th @click="handleClick"
      :class="{ 'cursor-pointer': sortable }">
    <component :is="sortIcon"
               class="icon icon-sm icon-thick" />
    {{ column.label }}
  </th>
</template>

<script setup>
import { IconChevronDown } from '@tabler/icons-vue';
import { IconArrowsVertical } from '@tabler/icons-vue';
import { IconChevronUp } from '@tabler/icons-vue';
import { computed } from 'vue';

const emit = defineEmits(['update:sort']);

const props = defineProps({
  column: {
    type: Object,
    required: true,
  },

  sort: {
    type: Object,
    default: () => ({}),
  },
});

const sortable = computed(() => props.column.sortable);

const sortIcon = computed(() => {
  if (!sortable.value) {
    return null;
  }

  if (props.sort.column !== props.column.field) {
    return IconArrowsVertical;
  }

  if (props.sort.direction === 'asc') {
    return IconChevronUp;
  }

  return IconChevronDown;
});

const handleClick = () => {
  if (!sortable.value) {
    return;
  }

  if (props.sort.column !== props.column.field) {
    emit('update:sort', {
      column: props.column.field,
      direction: 'asc',
    });
    return;
  }

  if (props.sort.direction === 'asc') {
    emit('update:sort', {
      column: props.column.field,
      direction: 'desc',
    });
    return;
  }

  emit('update:sort', {
    column: null,
    direction: null,
  });
};
</script>