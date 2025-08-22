import { RegisterContext } from 'provider/RegisterProvider';
import { useContext } from 'react';

const useRegister = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export default useRegister;
