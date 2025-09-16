/* eslint-disable react-native/no-inline-styles */
import { useQuery } from '@apollo/client/react';
import { AUTOMATION_ID } from '@constants';
import { ChevronLeft, Folder, LogoutIcon, Profile } from '@icons';
import Loader from 'components/Loader';
import TextView from 'components/TextView';
import messengerQL from 'graph/messengerQL';
import useAuth from 'hooks/useAuth';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const folders = [
  { icon: <Folder />, label: 'Vault Rules', onPress: () => {} },
  { icon: <Folder />, label: 'My Services', onPress: () => {} },
  { icon: <Folder />, label: 'Membership History', onPress: () => {} },
  { icon: <Folder />, label: 'Custom Drinks', onPress: () => {} },
];

const DrawerContent: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { signedOut } = useAuth();

  const { loggedUser } = useAuth();

  const { data, loading } = useQuery<any>(messengerQL.automationDetail, {
    variables: {
      _id: AUTOMATION_ID,
    },
  });

  const suggest = data?.automationDetail?.triggers;

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
                <TouchableOpacity style={styles.row} key={index}>
                  {item.icon}
                  <TextView fontWeight={'500'}>{item.label}</TextView>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.chats}>
              <TextView fontWeight={'500'} fontSize={18} color="#666666">
                Chats
              </TextView>
              {loading ? (
                <Loader />
              ) : (
                <View style={styles.gap}>
                  {suggest?.map((item: any, index: number) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        navigation.navigate('Connection', {
                          text: item?.config?.conditions?.[0]?.conditions?.[0]
                            ?.keywords?.[0]?.text,
                        })
                      }
                    >
                      <TextView key={index} fontSize={18}>
                        {
                          item?.config?.conditions?.[0]?.conditions?.[0]
                            ?.keywords?.[0]?.text
                        }
                      </TextView>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
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
