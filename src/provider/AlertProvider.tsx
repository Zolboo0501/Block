/* eslint-disable react-native/no-inline-styles */
import { Alert, Close, Success } from '@icons';
import { WIDTH } from '@utils';
import TextView from 'components/TextView';
import React, { createContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IAlertState {
  visible: boolean;
  message: string;
  type: 'success' | 'error';
}

interface IAlert {
  alertState: IAlertState;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export const AlertContext = createContext({} as IAlert);

const AlertProvider: React.FC<any> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const [_, setTime] = useState<number>(5);
  const [alertState, setAlertState] = useState<IAlertState>({
    visible: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (alertState.visible) {
      setTime(5);
      interval = setInterval(() => {
        setTime(prev => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval);
            setAlertState((state: any) => ({ ...state, visible: false }));
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [alertState.visible]);

  const onSuccess = (message: string) => {
    setAlertState({
      visible: true,
      message,
      type: 'success',
    });
  };

  const onError = (message: string) => {
    setAlertState({ visible: true, message, type: 'error' });
  };

  const mContext: IAlert = {
    alertState,
    onSuccess: (message: string) => onSuccess(message),
    onError: (message: string) => onError(message),
  };

  return (
    <AlertContext.Provider value={mContext}>
      {alertState.visible && (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOut}
          style={[
            styles.alertContainer,
            { top: insets.top > 0 ? insets.top + 15 : 15 },
          ]}
        >
          <View style={styles.infoContainer}>
            {alertState.type === 'error' ? <Alert /> : <Success size={18} />}
            <TextView
              fontWeight={'500'}
              fontSize={13}
              color={alertState.type === 'error' ? '#FF4648' : '#05A660'}
            >
              {alertState.message}
            </TextView>
          </View>
          <TouchableOpacity
            onPress={() => setAlertState(prev => ({ ...prev, visible: false }))}
          >
            <Close />
          </TouchableOpacity>
        </Animated.View>
      )}
      {children}
    </AlertContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  alertContainer: {
    borderRadius: 8,
    marginHorizontal: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    position: 'absolute',
    backgroundColor: '#272727',
    zIndex: 999,
    width: WIDTH - 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginRight: 15,
  },
});
export default AlertProvider;
