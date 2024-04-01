import { toast } from 'react-toastify';

const toastConfig = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
  style: {
    fontSize: '13px',
  },

};


export const toastError = (message) => {
  toast.error(message, toastConfig);
};
export const toastSuccess = (message) => {
  toast.success(message, toastConfig);
};

export const toastWarning = (message) => {
  toast.warning(message, toastConfig);
};

export const toastInfo = (message) => {
  toast.info(message, toastConfig);
};

// You can add more functions based on your needs
