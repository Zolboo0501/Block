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
import Rules from './screen/auth/register/Rules';
import MembershipDetail from './screen/auth/register/MembershipDetail';
import Payment from './screen/auth/register/Payment';
import Biometric from './screen/auth/register/Biometric';
import Home from './screen/home/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './navigation/DrawerContent';

const Routes = () => {
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#111111',
    },
  };

  const DrawerContainer = () => {
    return (
      <Drawer.Navigator
        defaultStatus={'closed'}
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={(rest: any) => <DrawerContent {...rest} />}
      >
        <Drawer.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
      </Drawer.Navigator>
    );
  };

  const AuthScreens = () => {
    return (
      <Stack.Navigator
        initialRouteName="Main"
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
        <Stack.Screen
          name="Rules"
          component={Rules}
          options={{
            headerShown: true,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="MembershipDetail"
          component={MembershipDetail}
          options={{
            headerShown: true,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            headerShown: true,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Biometric"
          component={Biometric}
          options={{
            headerShown: false,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            headerShadowVisible: false,
          }}
          name="Main"
          component={DrawerContainer}
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
