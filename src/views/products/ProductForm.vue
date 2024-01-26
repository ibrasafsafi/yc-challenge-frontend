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

                <div class="col-md-4">
                  <input type="file"
                         @change="onChange"
                         ref="imageInputRef"
                         accept="image/*"
                         class="form-control" />
                </div>

                <div class="col-md-7 ">
                  <img :src="`${backUrl}/${product.image}`"
                       @click.prevent="onFileChooserClicked"
                       class="img-fluid avatar avatar-2xl cursor-pointer"
                       alt="" />
                </div>

                <div class=" invalid-feedback d-block">
                  <div v-for="(error, index)  in validation.image"
                       :key="`error-${index}`">
                    {{ error }}
                  </div>
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
import { computed, ref } from 'vue';
import { api } from '@/boot/api';

const emit = defineEmits(['submit', 'update:validation']);

const props = defineProps({
  loading: Boolean,

  validation: {
    type: Object,
  },
});

const product = defineModel();

const backUrl = import.meta.env.VITE_FILES_URL;

const handleSubmit = async () => {
  if (imageInputRef.value.name) {
    await handleImageUpload();
  }
  if (!imageUploaded.value) return;
  emit('submit', product.value);
};


const onFileChooserClicked = () => {
  imageInputRef.value.click();
};

const imageInputRef = ref(null);
const onChange = async (event) => {
  const selectedFiles = event.target.files;
  imageInputRef.value = selectedFiles[0];
  // product.value.image = URL.createObjectURL(selectedFiles[0]);
};

const imageUploaded = ref(true);
const handleImageUpload = async () => {
  const file = imageInputRef.value;
  const formData = new FormData();
  formData.append('image', file);

  validation.value.image = null;
  imageUploaded.value = false;

  await api.post('/products/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((resp) => {
    product.value.image = resp.data;
    imageUploaded.value = true;
  }).catch(err => {
    if (err.response.status === 422) {
      validation.value.image = err.response.data.errors.image;
    }
  });

};

const validation = computed({
  get: () => props.validation,
  set: (v) => {
    emit('update:validation', v);
  },
});

</script>