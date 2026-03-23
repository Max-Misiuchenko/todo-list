import { ref } from 'vue';

type ToastColor = 'success' | 'error' | 'info' | 'warning';

interface ToastState {
  message: string;
  color: ToastColor;
}

const visible = ref(false);
const state = ref<ToastState>({ message: '', color: 'success' });

export const useToast = () => {
  const show = (message: string, color: ToastColor = 'success') => {
    state.value = { message, color };
    visible.value = true;
  };

  return { visible, state, show };
};
