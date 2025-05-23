import toast from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(message);
};

export const showError = (message) => {
  toast.error(message);
};

export const showWarning = (message) => {
  toast(message, {
    icon: '⚠️',
  });
};



export const showInfo = (message) => {
  toast(message, {
    icon: 'ℹ️',
  });
};


