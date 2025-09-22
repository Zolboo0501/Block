/* eslint-disable react-native/no-inline-styles */
import { useQuery } from '@apollo/client/react';
import { BY_ID, MEMBERSHIP_ID } from '@constants';
import { Edit } from '@icons';
import { setNavigation } from '@utils';
import Button from 'components/Button';
import Loader from 'components/Loader';
import TextView from 'components/TextView';
import dayjs from 'dayjs';
import userQL from 'graph/userQL';
import useAuth from 'hooks/useAuth';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';

const Profile: React.FC<any> = ({ navigation }) => {
  const { loggedUser } = useAuth();
  const { data, loading } = useQuery<any>(userQL.customerDetail, {
    variables: {
      _id: loggedUser?.erxesCustomerId,
    },
  });

  useLayoutEffect(() => {
    setNavigation({ navigation, title: 'My Profile' });
  }, [navigation]);

  const customerData = data?.customerDetail;

  if (loading) {
    return <Loader />;
  }

  const membership = customerData?.customFieldsData?.find(
    (item: any) => item?.field === MEMBERSHIP_ID,
  );

  const valid = customerData?.customFieldsData?.find(
    (item: any) => item?.field === BY_ID,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.space}>
        <View style={styles.column}>
          <View>
            <TextView fontSize={20}>Hi {customerData?.firstName},</TextView>
            <TextView fontSize={20}>Let’s make today awesome! ❤️</TextView>
          </View>
          <View style={styles.gap}>
            <TextView fontFamily="Optician Sans" fontSize={14} color="#444444">
              FULL NAME
            </TextView>
            <View style={styles.rowSpaceBetween}>
              <TextView fontSize={14} fontWeight={'500'} color="#DEDEDE">
                {customerData?.lastName} {customerData?.firstName}
              </TextView>
              <TouchableOpacity
                style={{ padding: 4 }}
                onPress={() => navigation.navigate('EditProfile')}
              >
                <Edit />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.gap}>
            <TextView fontFamily="Optician Sans" fontSize={14} color="#444444">
              Active membership type
            </TextView>
            <View style={styles.row}>
              <View style={styles.circle} />
              <TextView fontWeight={'500'} fontSize={14} color="#DEDEDE">
                {membership?.value} Membership
              </TextView>
            </View>
          </View>
          <View style={styles.gap}>
            <TextView fontFamily="Optician Sans" fontSize={14} color="#444444">
              Valid until
            </TextView>
            <View style={styles.row}>
              <View style={styles.circle} />
              <TextView fontWeight={'500'} fontSize={14} color="#DEDEDE">
                {dayjs(valid?.value)?.format('MMM DD, YYYY')}
              </TextView>
            </View>
          </View>
          <View style={styles.center}>
            <QRCodeStyled
              data={customerData?._id}
              style={styles.svg}
              padding={20}
              size={200}
              color={'#fff'}
              innerEyesOptions={{
                color: '#fff',
              }}
              outerEyesOptions={{
                borderRadius: '30%',
                color: '#fff',
              }}
            />
            {/* <QRCode getRef={qrRef} /> */}

            <View style={{ width: '70%' }}>
              <TextView fontSize={14} center color="#333333">
                Scan this QR code to confirm your membership.
              </TextView>
            </View>
          </View>
          <Button
            title="RENEW MEMBERSHIP"
            titleWeight={'500'}
            titleSize={14}
            onPress={() => navigation.navigate('ReNew')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: {
    paddingHorizontal: 15,
    flex: 1,
    marginTop: 15,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 20,
    backgroundColor: '#0C9647',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gap: {
    gap: 5,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  svg: {
    backgroundColor: '#111111',
    overflow: 'hidden',
  },
  column: {
    gap: 24,
  },
});
