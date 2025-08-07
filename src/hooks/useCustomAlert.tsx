import { useState, useCallback } from 'react';

export interface AlertOptions {
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error' | 'confirm';
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

export interface AlertState extends AlertOptions {
  isOpen: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useCustomAlert = () => {
  const [alertState, setAlertState] = useState<AlertState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  const showAlert = useCallback((options: AlertOptions) => {
    setAlertState({
      ...options,
      isOpen: true,
    });
  }, []);

  const showConfirm = useCallback((
    options: Omit<AlertOptions, 'type' | 'showCancel'> & { 
      confirmText?: string;
      cancelText?: string;
    }
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setAlertState({
        ...options,
        type: 'confirm',
        showCancel: true,
        isOpen: true,
        onConfirm: () => {
          resolve(true);
          setAlertState(prev => ({ ...prev, isOpen: false }));
        },
      });
      
      // Handle cancel/close as false
      const handleCancel = () => {
        resolve(false);
        setAlertState(prev => ({ ...prev, isOpen: false }));
      };
      
      // Store cancel handler for backdrop/escape key
      setAlertState(prev => ({ ...prev, onCancel: handleCancel }));
    });
  }, []);

  const showSuccess = useCallback((title: string, message: string) => {
    showAlert({ title, message, type: 'success' });
  }, [showAlert]);

  const showError = useCallback((title: string, message: string) => {
    showAlert({ title, message, type: 'error' });
  }, [showAlert]);

  const showWarning = useCallback((title: string, message: string) => {
    showAlert({ title, message, type: 'warning' });
  }, [showAlert]);

  const showInfo = useCallback((title: string, message: string) => {
    showAlert({ title, message, type: 'info' });
  }, [showAlert]);

  const closeAlert = useCallback(() => {
    setAlertState(prev => ({ ...prev, isOpen: false }));
  }, []);

  return {
    alertState,
    showAlert,
    showConfirm,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    closeAlert,
  };
};