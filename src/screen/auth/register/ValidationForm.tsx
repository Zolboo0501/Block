import { useMutation } from '@apollo/client/react';
import { CLIENT_PORTAL } from '@constants';
import { isEmpty, setNavigation } from '@utils';
import KeyboardContainer from 'components/KeyboardContainer';
import TextView from 'components/TextView';
import dayjs from 'dayjs';
import userQL from 'graph/userQL';
import useAlert from 'hooks/useAlert';
import useRegister from 'hooks/useRegister';
import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Form from 'view/validationForm/Form';
import Membership from 'view/validationForm/Membership';

const ValidationForm: React.FC<any> = ({ navigation }) => {
  const alert = useAlert();

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const {
    title,
    forename,
    surname,
    dateOfBirth,
    phone,
    email,
    password,
    communication,
    membership,
  } = useRegister();

  const [fieldErrors, setFieldErrors] = useState({
    title: false,
    forename: false,
    surname: false,
    password: false,
    phone: false,
    email: false,
    membership: false,
    dateOfBirth: false,
    communication: false,
    rules: false,
  });

  const [register] = useMutation(userQL.register, {
    onCompleted(data) {
      console.log(data, 'data');
    },

    onError(err) {
      console.log(err.message);
      alert.onError(err.message);
    },
  });

  useLayoutEffect(() => {
    setNavigation({ navigation, title: 'Vault Membership Form' });
  }, [navigation]);

  const validationForm = () => {
    const fieldsToCheck = {
      title,
      forename,
      surname,
      email,
      password,
      phone,
      dateOfBirth,
      membership,
      communication,
      toggleCheckBox,
    };

    let isError = false;
    let newErrors: { [key: string]: boolean } = {};

    Object.entries(fieldsToCheck).forEach(([key, value]) => {
      if (key === 'dateOfBirth') {
        const today = new Date();
        const diff = dayjs(today).diff(dayjs(value), 'years');
        if (diff < 21) {
          isError = true;
          return (newErrors[key] = true);
        }
        return (newErrors[key] = false);
      }

      if (key === 'phone') {
        if (value.length < 8) {
          return (newErrors[key] = true);
        }
        return (newErrors[key] = false);
      }

      if (key === 'toggleCheckBox') {
        if (!toggleCheckBox) {
          isError = true;
          return (newErrors.rules = true);
        }
        return (newErrors.rules = false);
      }

      if (isEmpty(value)) {
        isError = true;
        return (newErrors[key] = true);
      }
      return (newErrors[key] = false);
    });

    setFieldErrors({ ...fieldErrors, ...newErrors });

    return !isError;
  };

  const onSave = () => {
    if (validationForm()) {
      register({
        variables: {
          clientPortalId: CLIENT_PORTAL,
          phone,
          email,
          firstName: forename,
          lastName: surname,
          password: password,
        },
      });
    }
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
          <Membership isError={fieldErrors.membership} />
          <Form
            fieldErrors={fieldErrors}
            toggleCheckBox={toggleCheckBox}
            setToggleCheckBox={setToggleCheckBox}
            onSave={onSave}
          />
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
