/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
/* eslint-disable react-native/no-inline-styles */
import { ApolloProvider } from '@apollo/client/react';
import { CODE_PUSH_ID } from '@constants';
import { getUpdateSource, HotUpdater } from '@hot-updater/react-native';
import useBootSplash from 'hooks/useBootSplash';
import useFirebase from 'hooks/useFirebase';
import AlertProvider from 'provider/AlertProvider';
import ClientProvider from 'provider/ClientProvider';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Routes from './src/routes';
import Splash from './src/screen/splash/Splash';

const App: React.FC<any> = () => {
  useBootSplash();
  useFirebase();
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1, height: '100%' }}>
        <ApolloProvider client={ClientProvider()}>
          <AlertProvider>
            <KeyboardProvider>
              <Routes />
            </KeyboardProvider>
          </AlertProvider>
        </ApolloProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default HotUpdater.wrap({
  source: getUpdateSource(
    `https://${CODE_PUSH_ID}.supabase.co/functions/v1/update-server`,
    {
      updateStrategy: 'appVersion', // or "fingerprint"
    },
  ),
  requestHeaders: {
    // if you want to use the request headers, you can add them here
  },
  fallbackComponent: ({ progress, status }) => (
    <Splash progress={progress} status={status} />
  ),
})(App);
