/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
/* eslint-disable react-native/no-inline-styles */
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import Routes from './src/routes';
import { ApolloProvider } from '@apollo/client/react';
import ClientProvider from 'provider/ClientProvider';
import AlertProvider from 'provider/AlertProvider';

const App: React.FC<any> = () => {
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

export default App;
