import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextView from './TextView';
import { ICheckbox } from './types';

const Checkbox: React.FC<ICheckbox> = ({ value, onChange, label }) => {
  const renderLabel = () => {
    if (typeof label === 'object') {
      return (
        <View style={styles.label}>
          <TextView fontSize={14} fontWeight={'500'}>
            {label.label}
          </TextView>
          <TextView fontSize={14} fontWeight={'500'} color="#DEDEDE">
            {label.subLabel}
          </TextView>
        </View>
      );
    }
    if (typeof label === 'string') {
      return (
        <TextView fontSize={14} fontWeight={'500'} color="#DEDEDE">
          {label}
        </TextView>
      );
    }
  };

  const renderValue = () => {
    return (
      <View style={styles.circle}>{value && <View style={styles.fill} />}</View>
    );
  };

  return (
    <TouchableOpacity style={styles.row} onPress={() => onChange(value)}>
      {renderValue()}
      {renderLabel()}
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  label: {},
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
