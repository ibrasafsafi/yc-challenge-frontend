export const useButtonVariant = {
  type: String,
  default: 'default',
  validator: (value) =>
    [
      'default',
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
      'dark',

      'outline-primary',
      'outline-secondary',
      'outline-success',
      'outline-warning',
      'outline-danger',
      'outline-info',
      'outline-dark',

      'ghost-primary',
      'ghost-secondary',
      'ghost-success',
      'ghost-warning',
      'ghost-danger',
      'ghost-info',
      'ghost-dark',
    ].includes(value),
};