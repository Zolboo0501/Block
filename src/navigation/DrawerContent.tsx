/* eslint-disable react-native/no-inline-styles */
import { useMutation } from '@apollo/client/react';
import {
  ChevronLeft,
  Close,
  DeleteAccount,
  EventIcon,
  LogoutIcon,
  Profile,
} from '@icons';
import { WIDTH } from '@utils';
import Button from 'components/Button';
import TextView from 'components/TextView';
import userQL from 'graph/userQL';
import useAlert from 'hooks/useAlert';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DrawerContent: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { signedOut } = useAuth();
  const [visible, onVisible] = useState<boolean>(false);
  const folders = [
    {
      icon: <EventIcon />,
      label: 'Event',
      onPress: () => {
        navigation.navigate('Event');
      },
    },
  ];

  const { loggedUser } = useAuth();

  const onDeleteUser = () => {
    onVisible(true);
  };

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
                Activities
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
          onDeleteUser();
        }}
        style={[
          styles.logout,
          { paddingBottom: insets.bottom > 0 ? insets.bottom : 10 },
        ]}
      >
        <TextView fontWeight={'500'} fontSize={18} color="#FF4648">
          Delete Account
        </TextView>
        <DeleteAccount size={26} color="#FF9797" />
      </TouchableOpacity>
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
      <DeleteModal modalVisible={visible} setModalVisible={onVisible} />
    </View>
  );
};

export default DrawerContent;

const DeleteModal: React.FC<any> = ({ modalVisible, setModalVisible }) => {
  const alert = useAlert();
  const { signedOut } = useAuth();
  const { loggedUser } = useAuth();

  const [deleteCustomer] = useMutation(userQL.removeCustomer, {
    onCompleted() {
      signedOut();
    },
    onError(error) {
      alert.onError(error.message);
    },
  });

  const [deleteUser] = useMutation(userQL.removeUser, {
    onCompleted() {
      deleteCustomer({
        variables: {
          customerIds: [loggedUser?.erxesCustomerId],
        },
      });
    },
    onError(error) {
      alert.onError(error.message);
    },
  });

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      transparent
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modal,
            {
              backgroundColor: '#111111',
            },
          ]}
        >
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setModalVisible(false)}
          >
            <Close size={20} />
          </TouchableOpacity>
          <View style={styles.modalDetail}>
            <TextView fontSize={18} fontWeight={'600'} center color={'#fff'}>
              Alert
            </TextView>
            <TextView color={'#fff'} center>
              Are you sure you want to delete account?
            </TextView>
            <Button
              height={45}
              title="Yes"
              titleWeight={'600'}
              titleSize={14}
              onPress={() => {
                deleteUser({
                  variables: {
                    clientPortalUserIds: [loggedUser?._id],
                  },
                });
              }}
            />
            <Button
              height={45}
              title="No"
              titleWeight={'600'}
              titleSize={14}
              onPress={() => {
                setModalVisible(false);
              }}
              color="#000"
              titleColor={'#fff'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
  modal: {
    width: WIDTH - 40,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    padding: 5,
  },
  modalDetail: {
    flexDirection: 'column',
    gap: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    alignItems: 'flex-end',
  },
});
