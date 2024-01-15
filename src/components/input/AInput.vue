<template>
  <div>
    <label class="form-label">
      {{ label }}
    </label>

    <div class="input-group input-group-flat"
         :class="inputClasses">
      <span v-if="'prepend' in $slots"
            class="input-group-text">
        <slot name="prepend"></slot>
      </span>

      <component :is="component"
                 :value="model"
                 @input="handleEdit"
                 v-bind="inputAttrs"
                 class="form-control" />

      <span v-if="'append' in $slots"
            class="input-group-text">
        <slot name="append"></slot>
      </span>
    </div>

    <div class="invalid-feedback">
      <div v-for="(error, index)  in errors"
           :key="`error-${index}`">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: String,
  type: String,
  placeholder: String,

  step: String,

  modelValue: {
    type: String,
  },

  invalid: {
    type: Boolean,
  },

  errors: {
    type: Array,
    default: () => []
  }
});

const model = defineModel('modelValue');

const handleEdit = (e) => {
  model.value = e.target.value;
}

const inputClasses = computed(() => {
  return {
    'is-invalid': props.invalid
  };
});

const component = computed(() => {
  if (props.type !== 'textarea') return 'input';

  return 'textarea';
});

const inputAttrs = computed(() => {
  const attrs = {
    placeholder: props.placeholder,
    step: props.step,
  };

  if (component.value.type !== 'textarea') {
    attrs.type = props.type;
  }

  return attrs;
});
</script>

<style>
.input-group-flat.is-invalid:focus-within {
  box-shadow: 0 0 0 .25rem rgba(var(--tblr-danger-rgb), .25);
  border-color: var(--tblr-danger) !important;
}

.input-group-flat.is-invalid *,
.input-group-flat.is-invalid:focus-within * {
  border-color: var(--tblr-danger) !important;
}
</style>