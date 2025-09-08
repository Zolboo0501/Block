import { AlertContext } from 'provider/AlertProvider';
import { useContext } from 'react';

const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export default useAlert;
