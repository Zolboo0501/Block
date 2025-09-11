/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import React from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import TextView from './TextView';
import { WIDTH } from '@utils';

const PaymentItem: React.FC<any> = ({
  data,
  index,
  onPress,
}: {
  data: any;
  index: number;
  onPress?: (data: any) => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      key={index}
      onPress={() =>
        onPress
          ? onPress(data)
          : Linking.openURL(data?.link).catch(() =>
              Alert.alert('Сонгогдсон апп сугаагүй эсвэл алдаа гарсан байна.'),
            )
      }
    >
      <FastImage
        source={{ uri: data?.logo }}
        style={styles.logo}
        resizeMode="cover"
      />
      <View style={{ flex: 1 }}>
        <TextView color="#fff" fontSize={14} fontWeight={'500'}>
          {data?.name}
        </TextView>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentItem;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: (WIDTH - 40) / 2,
    borderRadius: 10,
    backgroundColor: '#272727',
    padding: 10,
    gap: 10,
  },
});
