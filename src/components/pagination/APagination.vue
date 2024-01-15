<template>
  <ul class="pagination m-0">

    <li class="page-item"
        :class="{ disabled: isFirstPage || loading }">
      <button class="page-link"
              v-bind="{ zIndex: isFirstPage ? '-1' : '0' }"
              @click="previousPage">
        <IconChevronLeft class="icon" />
        prev
      </button>
    </li>

    <li v-for="tempPage in lastPage"
        :key="`page-${tempPage}`"
        :class="{ active: page === tempPage, disabled: loading }"
        class="page-item">
      <button class="page-link"
              @click="navigate(tempPage)">
        {{ tempPage }}
      </button>
    </li>

    <li class="page-item"
        :class="{ disabled: isLastPage || loading }">
      <button class="page-link"
              @click="nextPage"
              v-bind="{ zIndex: isLastPage ? '-1' : '0' }">
        next

        <IconChevronRight class="icon" />
      </button>
    </li>
  </ul>
</template>

<script setup>
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-vue';
import { computed } from 'vue';

const emit = defineEmits(['update:page']);

const props = defineProps({
  lastPage: Number,

  page: Number,

  loading: Boolean
});

const isFirstPage = computed(() => props.page === 1);

const isLastPage = computed(() => props.page === props.lastPage);

const navigate = (page) => {
  emit('update:page', page);
}

const nextPage = () => {
  if (props.page < props.lastPage) {
    navigate(props.page + 1);
  }
}

const previousPage = () => {
  if (props.page > 1) {
    navigate(props.page - 1);
  }
}
</script>