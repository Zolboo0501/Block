/* eslint-disable react/no-unstable-nested-components */
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterProvider from 'provider/RegisterProvider';
import React from 'react';
import DrawerContent from './navigation/DrawerContent';
import Login from './screen/auth/Login';
import OtpVerify from './screen/auth/OtpVerify';
import Biometric from './screen/auth/register/Biometric';
import MembershipDetail from './screen/auth/register/MembershipDetail';
import Payment from './screen/auth/register/Payment';
import Rules from './screen/auth/register/Rules';
import ValidationForm from './screen/auth/register/ValidationForm';
import SignIn from './screen/auth/SignIn';
import Home from './screen/home/Home';
import Onboard from './screen/splash/Onboard';
import { initialLoginState } from '@constants';
import Profile from './screen/profile/Profile';
import AuthProvider from 'provider/AuthProvider';
import ReNew from './screen/profile/ReNew';
import EditProfile from './screen/profile/EditProfile';
import { useMMKVBoolean } from 'react-native-mmkv';
import { keys } from '@storage';

const Routes = () => {
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();
  const [splashShow, _] = useMMKVBoolean(keys.splashShow);
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#111111',
    },
  };

  const loginReducer = (prevState: any, action: any) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          loginToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          loginToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const contextValue: any = {
    state: loginState,
    dispatch: dispatch,
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
        initialRouteName={splashShow ? 'Login' : 'Onboard'}
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
      </Stack.Navigator>
    );
  };

  const CoreRoot = () => {
    return (
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: { backgroundColor: '#111111' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
            headerShadowVisible: false,
          }}
          name="Main"
          component={DrawerContainer}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: '#111111' },
            headerTintColor: '#fff',
          }}
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: '#111111' },
            headerTintColor: '#fff',
          }}
          name="ReNew"
          component={ReNew}
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
          name="EditProfile"
          component={EditProfile}
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
      {loginState?.loginToken === null ? (
        <RegisterProvider value={contextValue}>
          <AuthScreens />
        </RegisterProvider>
      ) : (
        <AuthProvider value={contextValue}>
          <CoreRoot />
        </AuthProvider>
      )}
    </NavigationContainer>
  );
};

export default Routes;
