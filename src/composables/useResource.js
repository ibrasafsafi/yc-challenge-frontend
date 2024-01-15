import { ref, watch, onMounted } from 'vue';
import { api } from '../boot/api.js';

export function useResource(resource) {
  const data = ref([]);
  const search = ref('');
  const sort = ref({ column: undefined, direction: undefined });
  const loading = ref(false);

  const pagination = ref({
    page: 1,
    perPage: 30,
    total: 0,
    from: 0,
    to: 0,
    lastPage: 0,
  });

  const filters = ref({});

  const fetch = () => {
    loading.value = true;

    const filtersParam = Object.fromEntries(
      Object.entries(filters.value).filter(([, value]) => {
        return !!value;
      }),
    );

    api
      .get(resource, {
        params: {
          sort: sort.value.column,
          direction: sort.value.direction,
          page: pagination.value.page,
          per_page: pagination.value.perPage,
          search: search.value,

          filters: filtersParam,
        },
      })
      .then((response) => {
        data.value = response.data.data;

          // pagination.value = {
          //   page: response.data.meta.current_page,
          //   perPage: response.data.meta.per_page,
          //   total: response.data.meta.total,
          //   from: response.data.meta.from,
          //   to: response.data.meta.to,
          //   lastPage: response.data.meta.last_page,
          // };
      })
      .finally(() => {
        loading.value = false;
      });
  };

  watch(
    [pagination, search, sort, filters],
    () => {
      if (loading.value) return;

      fetch();
    },
    { deep: true },
  );

  onMounted(() => {
    fetch();
  });

  return {
    pagination,
    filters,
    loading,
    data,
    search,
    sort,
    fetch,
  };
}
