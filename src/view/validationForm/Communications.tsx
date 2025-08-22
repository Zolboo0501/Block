/* eslint-disable react-native/no-inline-styles */
import GroupCheckbox from 'components/GroupCheckbox';
import TextView from 'components/TextView';
import useRegister from 'hooks/useRegister';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const Communications: React.FC<any> = () => {
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

  const { communication, onChange } = useRegister();

  return (
    <View style={{ gap: 16 }}>
      <TextView fontSize={14} fontFamily="Optician Sans" color="#DEDEDE">
        Communications
      </TextView>
      <View style={styles.rowSpaceBetween}>
        {checkboxs.map((item: any, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => onChange('communication', item.key)}
          >
            <GroupCheckbox value={communication} item={item} label={item} />
          </TouchableOpacity>
        ))}
      </View>
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
