import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
const useBootSplash = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);
};

export default useBootSplash;
