/* eslint-disable react-native/no-inline-styles */
import { Edit } from '@icons';
import { setNavigation } from '@utils';
import Button from 'components/Button';
import TextView from 'components/TextView';
import dayjs from 'dayjs';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const Profile: React.FC<any> = ({ navigation }) => {
  const today = dayjs();

  useLayoutEffect(() => {
    setNavigation({ navigation, title: 'My Profile' });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.space}>
        <View style={styles.column}>
          <View>
            <TextView fontSize={20}>Hi Mendsaikhan,</TextView>
            <TextView fontSize={20}>Let’s make today awesome! ❤️</TextView>
          </View>
          <View style={styles.gap}>
            <TextView fontFamily="Optician Sans" fontSize={14} color="#444444">
              FULL NAME
            </TextView>
            <View style={styles.rowSpaceBetween}>
              <TextView fontSize={14} fontWeight={'500'} color="#DEDEDE">
                Batbold Mendsaikhan
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
              active membership type
            </TextView>
            <View style={styles.row}>
              <View style={styles.circle} />
              <TextView fontWeight={'500'} fontSize={14} color="#DEDEDE">
                Platinum Membership
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
                {today.format('MMM DD, YYYY')}
              </TextView>
            </View>
          </View>
          <View style={styles.center}>
            <QRCode
              size={210}
              value="http://awesome.link.qr"
              logoBackgroundColor="transparent"
            />
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
  column: {
    gap: 24,
  },
});
