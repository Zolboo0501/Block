import { setNavigation } from '@utils';
import KeyboardContainer from 'components/KeyboardContainer';
import TextView from 'components/TextView';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Form from 'view/validationForm/Form';
import Membership from 'view/validationForm/Membership';

const ValidationForm: React.FC<any> = ({ navigation }) => {
  useLayoutEffect(() => {
    setNavigation({ navigation, title: 'Vault Membership Form' });
  }, [navigation]);

  const onSave = () => {
    navigation.navigate('OtpVerify', { type: 'register' });
  };

  return (
    <KeyboardContainer>
      <SafeAreaView style={styles.container}>
        <View style={styles.space}>
          <View style={styles.column}>
            <TextView fontFamily="NewYork" fontSize={40}>
              MEMBERSHIP
            </TextView>
            <TextView fontFamily="NewYork" fontSize={40}>
              FORM
            </TextView>
          </View>
          <Membership />
          <Form onSave={onSave} />
        </View>
      </SafeAreaView>
    </KeyboardContainer>
  );
};

export default ValidationForm;

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: { flex: 1, paddingVertical: 10, gap: 32 },
  column: { gap: 14, marginTop: 15, paddingHorizontal: 15 },

  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
