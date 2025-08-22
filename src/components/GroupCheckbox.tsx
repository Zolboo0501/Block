import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextView from './TextView';

const GroupCheckbox: React.FC<any> = ({ item, value, label }) => {
  return (
    <View style={styles.row}>
      <View style={styles.circle}>
        {value === item.key && <View style={styles.fill} />}
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
    borderColor: '#DEDEDE',
    padding: 3,
    borderRadius: 20,
  },
  fill: { flex: 1, backgroundColor: '#fff', borderRadius: 20 },
});
