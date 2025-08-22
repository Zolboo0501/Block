/* eslint-disable react/no-unstable-nested-components */
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './screen/auth/Login';
import Onboard from './screen/splash/Onboard';
import SignIn from './screen/auth/SignIn';
import OtpVerify from './screen/auth/OtpVerify';

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
      <Stack.Navigator initialRouteName="Onboard">
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
            headerShown: false,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="OtpVerify"
          component={OtpVerify}
          options={{
            headerShown: false,
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthScreens />
    </NavigationContainer>
  );
};

export default Routes;
