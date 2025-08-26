import { AuthContext } from 'provider/AuthProvider';
import { useContext } from 'react';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export default useAuth;
