/* eslint-disable react-native/no-inline-styles */
import { ChevronLeft, Folder, LogoutIcon, Profile } from '@icons';
import TextView from 'components/TextView';
import useAuth from 'hooks/useAuth';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DrawerContent: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { signedOut } = useAuth();
  const folders = [
    {
      icon: <Folder />,
      label: 'Event',
      onPress: () => {
        navigation.navigate('Event');
      },
    },
  ];

  const { loggedUser } = useAuth();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top > 0 ? insets.top : 15 },
      ]}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.back}>
            <TouchableOpacity onPress={() => navigation.closeDrawer()}>
              <ChevronLeft />
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            <TouchableOpacity
              style={[styles.row, { paddingVertical: 10 }]}
              onPress={() => navigation.navigate('Profile')}
            >
              <Profile />
              <TextView fontWeight={'500'}>My Profile</TextView>
            </TouchableOpacity>
            <View style={styles.folders}>
              <TextView fontWeight={'500'} fontSize={18} color="#666666">
                Folders
              </TextView>
              {folders.map((item: any, index: number) => (
                <TouchableOpacity
                  style={styles.row}
                  key={index}
                  onPress={item?.onPress}
                >
                  {item.icon}
                  <TextView fontWeight={'500'}>{item.label}</TextView>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          signedOut();
        }}
        style={[
          styles.logout,
          { paddingBottom: insets.bottom > 0 ? insets.bottom : 10 },
        ]}
      >
        <TextView fontWeight={'500'} fontSize={18} color="#DEDEDE">
          {loggedUser?.lastName} {loggedUser?.firstName}
        </TextView>
        <LogoutIcon />
      </TouchableOpacity>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, backgroundColor: '#111111' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logout: {
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chats: {
    gap: 16,
  },
  gap: {
    gap: 24,
  },
  folders: {
    gap: 12,
  },
  column: {
    gap: 20,
  },
  back: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingVertical: 10,
  },
});
