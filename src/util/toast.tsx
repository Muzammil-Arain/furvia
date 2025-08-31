// utils/toast.tsx
import { createRef } from 'react';
import { ToastRef, ToastOptions } from 'react-native-toast-notifications';

// global ref
export const toastRef = createRef<ToastRef>();

// helper wrapper
export const showToast = {
  success: (msg: string, options: ToastOptions = {}) => {
    toastRef.current?.show(msg, {
      type: 'success',
      duration: 2000,
      placement: 'top',
      ...options,
    });
  },
  error: (msg: string, options: ToastOptions = {}) => {
    toastRef.current?.show(msg, {
      type: 'danger',
      duration: 2000,
      placement: 'top',
      ...options,
    });
  },
  info: (msg: string, options: ToastOptions = {}) => {
    toastRef.current?.show(msg, {
      type: 'normal',
      duration: 2000,
      placement: 'top',
      ...options,
    });
  },
};
