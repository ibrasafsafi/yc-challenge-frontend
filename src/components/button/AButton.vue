<template>
  <component :is="component"
             :class="classes"
             v-bind="attrs"
             @click="handleClick">
    <slot></slot>
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useButtonVariant } from '@/composables/useButtonVariant.js';

const emit = defineEmits(['click']);

const props = defineProps({
  disabled: Boolean,

  loading: Boolean,

  type: {
    type: String,
    default: 'button',
    validator: value => ['button', 'submit', 'reset'].includes(value)
  },

  href: {
    type: String,
  },

  to: {
    type: [String, Object]
  },

  variant: useButtonVariant,

  square: {
    type: Boolean,
  },

  pill: {
    type: Boolean,
  },

  block: {
    type: Boolean
  },

  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md', 'lg'].includes(value)
  }
});

const component = computed(() => {
  if (props.to) {
    return RouterLink;
  }

  if (props.href) {
    return 'a';
  }

  return 'button';
});

const attrs = computed(() => {
  const attrs = {};

  if (props.to) {
    attrs.to = props.to;
  } else if (props.href) {
    attrs.href = props.href;
  }

  if (props.disabled) {
    attrs.disabled = 'disabled';
  }

  return attrs;
});

const classes = computed(() => {
  return 'btn '
    + (props.variant ? `btn-${props.variant} ` : '')
    + (props.block ? 'w-100 ' : '')
    + (props.square ? 'btn-square ' : '')
    + (props.loading ? 'btn-loading ' : '')
    + (props.size ? `btn-${props.size} ` : '')
    + (props.pill ? 'btn-pill ' : '');
});

const handleClick = e => {
  if (props.disabled) return;

  emit('click', e);
}
</script>