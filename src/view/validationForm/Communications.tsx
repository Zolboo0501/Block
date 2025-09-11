/* eslint-disable react-native/no-inline-styles */
import GroupCheckbox from 'components/GroupCheckbox';
import TextView from 'components/TextView';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const Communications: React.FC<any> = ({ value, onChange, isError }) => {
  const checkboxs = [
    {
      label: 'By email',
      key: 'email',
    },
    {
      label: 'By phone',
      key: 'phone',
    },
    {
      label: 'SMS',
      key: 'SMS',
    },
  ];

  return (
    <View style={{ gap: 16 }}>
      <TextView fontSize={14} fontFamily="Optician Sans" color="#DEDEDE">
        Communications
      </TextView>
      <View style={styles.rowSpaceBetween}>
        {checkboxs.map((item: any, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onChange(item.key);
            }}
          >
            <GroupCheckbox
              value={value}
              item={item}
              label={item}
              isError={isError}
            />
          </TouchableOpacity>
        ))}
      </View>
      {isError && (
        <TextView fontSize={13} color="#FF4648" fontWeight={'500'}>
          You must select the communications.
        </TextView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
export default Communications;
