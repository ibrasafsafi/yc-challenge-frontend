export const useAlertVariant = {
  type: String,
  default: 'primary',
  validator: (value) =>
    ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'dark'].includes(value),
};
