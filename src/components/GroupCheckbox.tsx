/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextView from './TextView';

const GroupCheckbox: React.FC<any> = ({ item, value, label, isError }) => {
  const renderFill = () => {
    if (typeof value === 'string') {
      if (value === item.key) {
        return <View style={styles.fill} />;
      }
    }
    if (typeof value === 'object') {
      if (value?.key === item.key) {
        return <View style={styles.fill} />;
      }
    }
  };

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.circle,
          {
            borderColor: isError ? '#FF4648' : '#DEDEDE',
          },
        ]}
      >
        {renderFill()}
      </View>
      <View>
        <TextView fontSize={14} fontWeight={'500'}>
          {label.label}
        </TextView>
        {label.subLabel && (
          <TextView fontSize={14} fontWeight={'500'} color="#DEDEDE">
            {label.subLabel}
          </TextView>
        )}
      </View>
    </View>
  );
};

export default GroupCheckbox;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  circle: {
    width: 16,
    height: 16,
    borderWidth: 1,
    padding: 3,
    borderRadius: 20,
  },
  fill: { flex: 1, backgroundColor: '#fff', borderRadius: 20 },
});
