<template>
  <div :class="classes">
    <div class="d-flex">
      <div>
        <component :is="icon"
                   class="icon alert-icon"
                   :class="iconClass" />
      </div>

      <div>
        <h4 v-if="title"
            :class="titleClass"
            class="alert-title">
          {{ title }}
        </h4>

        <div :class="messageClass">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAlertVariant } from '../../composables/useAlertVariant';

const props = defineProps({
  variant: useAlertVariant,

  title: String,

  message: String,

  important: Boolean,

  icon: [String, Object],

  iconClass: [String, Object, Array],

  titleClass: [String, Object, Array],

  messageClass: [String, Object, Array]
});

const classes = computed(() => {
  return 'alert '
    + ('alert-' + props.variant + ' ')
    + (props.important ? 'alert-important ' : ' ')
});
</script>