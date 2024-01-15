<template>
  <div class="page-body">

    <div class="container-xl">
      <form @submit.prevent="handleSubmit">
        <div class="card">
          <div class="card-header p-2">
            <div class="d-flex justify-content-between align-items-center w-100 gap-2">
              <h2 class="card-title">
                <slot name="title"></slot>
              </h2>

              <div class="d-inline-flex gap-2">
                <slot name="actions"></slot>
              </div>
            </div>
          </div>

          <div style="height: 1px;"
               :class="{ invisible: !loading }"
               class="progress rounded-0">
            <div class="progress-bar progress-bar-indeterminate"></div>
          </div>

          <div class="card-body">

            <div class="row row-cards">
              <div class="col-md-6">
                <AInput class="mb-2"
                        type="text"
                        label="Product name"
                        :invalid="'name' in validation"
                        :errors="validation.name"
                        v-model="product.name" />
              </div>

              <div class="col-md-6">
                <AInput class="mb-2"
                        type="number"
                        label="Price"
                        step=".01"
                        :invalid="'price' in validation"
                        :errors="validation.price"
                        v-model.number="product.price" />
              </div>

              <div class="col-md-6">
                <AInput class="mb-2"
                        type="textarea"
                        label="Description"
                        :invalid="'description' in validation"
                        :errors="validation.description"
                        v-model="product.description" />
              </div>

              <div class="col-md-6">
                <ASelect class="mb-2"
                         label="Categories"
                         :invalid="'categories' in validation"
                         :errors="validation.categories"
                         v-model="product.categories" />
              </div>

              <div class="row">
                <label class="form-label"> Image</label>
                <div class="col-md-5">
                  <input type="file"
                         @change="handleImageUpload"
                         accept="image/*"
                         class="form-control" />
                </div>

                <div class="col-md-7 ">
                  <img :src="product.image"
                       class="img-fluid avatar"
                       alt="" />
                </div>

              </div>

            </div>

          </div>

        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import AInput from '../../components/input/AInput.vue';
import ASelect from '@/components/ASelect.vue';

const emit = defineEmits(['submit']);

defineProps({
  loading: Boolean,

  validation: {
    type: Object,
  },
});

const product = defineModel();

const handleSubmit = () => {
  emit('submit', product.value);
};

const handleImageUpload = (e) => {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = () => {
    product.value.image = reader.result;
  };
};
</script>