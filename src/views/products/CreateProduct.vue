<template>
  <ProductForm v-model="product"
               @submit="handleSubmit"
               v-model:validation="validation">
    <template #title>
      New product
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
import { ref } from 'vue';
import { api } from '@/boot/api';
import { useRouter } from 'vue-router';
import ProductForm from './ProductForm.vue';

const validation = ref({});
const submitting = ref(false);

const product = ref({});

const router = useRouter();

const handleSubmit = () => {
  validation.value = {};
  submitting.value = true;

  api.post('/products', product.value)
    .then((resp) => {
      router.push({
        name: 'products.edit',
        params: { id: resp.data.data.id }
      });
    })
    .catch(err => {
      if (err.response.status === 422) {
        validation.value = err.response.data.errors;
      }
    })
    .finally(() => submitting.value = false);

};
</script>