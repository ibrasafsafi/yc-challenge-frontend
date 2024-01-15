<template>
  <ProductForm v-model="product"
               @submit="handleSubmit"
               :loading="fetching"
               :validation="validation">
    <template #title>
      Edit {{ product.title }}
    </template>

    <template #actions>
      <AButton :to="{ name: 'products.index' }">
        Cancel
      </AButton>

      <AButton variant="primary"
               type="submit"
               :loading="submitting">
        <IconDeviceFloppy class="icon" />
        Save
      </AButton>
    </template>
  </ProductForm>
</template>

<script setup>
import { IconDeviceFloppy } from '@tabler/icons-vue';
import AButton from '../../components/button/AButton.vue';
import { onMounted, ref } from 'vue';
import { api } from '@/boot/api';
import { useRouter } from 'vue-router';
import ProductForm from './ProductForm.vue';

const props = defineProps({
  id: String,
});


const validation = ref({});
const submitting = ref(false);

const product = ref({});

const router = useRouter();

const fetching = ref(false);

const handleSubmit = (product) => {
  validation.value = {};
  submitting.value = true;

  api.put(`/products/${props.id}`, product)
    .then(() => {
      router.push({ name: 'products.index' });
    })
    .catch(err => {
      if (err.response.status === 422) {
        validation.value = err.response.data.errors;
      }
    })
    .finally(() => submitting.value = false);

};

const fetch = (id) => {
  fetching.value = true;

  api.get(`/products/${id}`)
    .then(response => {
      product.value = response.data.data;
    }).catch(err => {
    console.log({ err });
  }).finally(() => {
    fetching.value = false;
  });
};

onMounted(() => fetch(+props.id));
</script>