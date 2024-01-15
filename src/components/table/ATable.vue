<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
    </div>
    <div class="card-body border-bottom py-3">
      <div class="d-flex">
        <div class="text-secondary">
          Show
          <div class="mx-2 d-inline-block">
            <input type="text"
                   class="form-control form-control-sm"
                   v-model.number.lazy="perPage"
                   size="3"
                   aria-label="Invoices count">
          </div>
          entries
        </div>
        <div class="ms-auto text-secondary">
          Search:
          <div class="ms-2 d-inline-block">
            <input type="text"
                   v-model.lazy="search"
                   class="form-control form-control-sm"
                   aria-label="Search invoice">
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table card-table table-vcenter text-nowrap datatable">
        <thead>
          <tr>
            <ATh v-for="(col, index) in columns"
                 :key="`col-${index}`"
                 @update:sort="handleSort"
                 :sort="sort"
                 :column="col" />
          </tr>

          <tr :class="{ invisible: !loading }">
            <th colspan="100%"
                class="p-0 border-0">
              <div style="height: 1px;"
                   class="progress rounded-0">
                <div class="progress-bar progress-bar-indeterminate"></div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <slot name="top-row"></slot>
          </tr>
        </tbody>

        <tbody>
          <tr v-for="(row, rowIndex) in rows"
              :key="`row-${rowIndex}`">
            <td v-for="(column, colIndex) in columns"
                :key="`row-${rowIndex}-${colIndex}`"
                class="text-truncate"
                :style="column.style">
              <slot :name="`body-cell-${column.name}`"
                    :value="row[column.field]"
                    :row="row">
                {{ row[column.field] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="'footer' in $slots || pagination !== null"
         class="card-footer d-flex align-items-center">
      <p class="m-0 text-secondary">Showing <span>{{ pagination.from }}</span> to <span>{{ pagination.to }}</span> of
        <span>{{ pagination.total }}</span> entries
      </p>

      <APagination class="ms-auto"
                   :loading="loading"
                   :last-page="pagination.lastPage"
                   v-model:page="page" />
    </div>
  </div>
</template>

<script setup>
import ATh from './ATh.vue';
import APagination from '../pagination/APagination.vue';

const emit = defineEmits(['update:sort', 'update:page']);

defineProps({
  title: {
    type: String,
    required: true,
  },

  loading: {
    type: Boolean,
    default: false,
  },

  columns: {
    type: Array,
    default: () => [],
  },

  sort: {
    type: Object,
    default: () => ({}),
  },

  rows: {
    type: Array,
    default: () => [],
  },

  pagination: {
    type: Object,
    default: null
  },
});


const search = defineModel('search');
const perPage = defineModel('perPage');
const page = defineModel('page');

const handleSort = (sort) => {
  emit('update:sort', sort);
};
</script>