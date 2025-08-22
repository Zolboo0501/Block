/* eslint-disable react/no-unstable-nested-components */
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './screen/auth/Login';
import Onboard from './screen/splash/Onboard';
import SignIn from './screen/auth/SignIn';
import OtpVerify from './screen/auth/OtpVerify';
import RegisterProvider from 'provider/RegisterProvider';
import ValidationForm from './screen/auth/register/ValidationForm';

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#111111',
    },
  };

  const AuthScreens = () => {
    return (
      <Stack.Navigator
        initialRouteName="ValidationForm"
        screenOptions={{ headerStyle: { backgroundColor: '#111111' } }}
      >
        <Stack.Screen
          name="Onboard"
          component={Onboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: true,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="OtpVerify"
          component={OtpVerify}
          options={{
            headerShown: true,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="ValidationForm"
          component={ValidationForm}
          options={{
            headerShown: true,
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <RegisterProvider>
        <AuthScreens />
      </RegisterProvider>
    </NavigationContainer>
  );
};

export default Routes;
