/* eslint-disable @typescript-eslint/no-shadow */
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { ClIENTPORTAL_ID } from '@constants';
import { keys } from '@storage';
import { isEmpty, setNavigation } from '@utils';
import KeyboardContainer from 'components/KeyboardContainer';
import TextView from 'components/TextView';
import dayjs from 'dayjs';
import userQL from 'graph/userQL';
import useAlert from 'hooks/useAlert';
import useRegister from 'hooks/useRegister';
import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useMMKVBoolean } from 'react-native-mmkv';
import Form from 'view/validationForm/Form';
import Membership from 'view/validationForm/Membership';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ValidationForm: React.FC<any> = ({ navigation }) => {
  const alert = useAlert();
  const [_, setConfirmFaceId] = useMMKVBoolean(keys.confirmFaceId);
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
    onChange,
  } = useRegister();

  const [fieldErrors, setFieldErrors] = useState({
    title: {
      isEmpty: false,
      label: 'YOUR TITLE',
    },
    forename: {
      isEmpty: false,
      label: 'FORENAME',
    },
    surname: {
      isEmpty: false,
      label: 'SURNAME',
    },
    password: {
      isEmpty: false,
      label: 'PASSWORD',
    },
    phone: {
      isEmpty: false,
      label: 'PHONE',
    },
    email: {
      isEmpty: false,
      label: 'EMAIL',
    },
    membership: {
      isEmpty: false,
      label: 'MEMBERSHIP',
    },
    dateOfBirth: {
      isEmpty: false,
      label: 'DATE OF BIRTH',
    },
    communication: {
      isEmpty: false,
      label: 'COMMUNICATIONS',
    },
    rules: {
      isEmpty: false,
      label: 'VAULT RULES',
    },
  });

  const [getDetail, { loading: detailLoading }] = useLazyQuery(
    userQL.clientPortalUserDetail,
  );

  const [customerEdit, { loading: customerLoading }] = useMutation(
    userQL.customerEdit,
    {
      onCompleted() {
        setConfirmFaceId(undefined);
        alert.onSuccess('We are sending an OTP code to your phone number.');
        navigation.navigate('OtpVerify', { type: 'register' });
      },
      onError(error) {
        console.log(error.message);
        alert.onError(`${error.message} in customer edit`);
      },
    },
  );

  const [register, { loading }] = useMutation(userQL.register, {
    onCompleted(data: any) {
      const id = data?.clientPortalRegister;
      onChange('userId', id);
      getDetail({
        variables: { _id: id },
      })
        .then(({ data }: { data: any }) => {
          const erxesCustomerId = data?.clientPortalUserDetail?.erxesCustomerId;
          onChange('erxesCustomerId', erxesCustomerId);

          customerEdit({
            variables: {
              _id: erxesCustomerId,
              firstName: forename,
              lastName: surname,
              sex: title.value,
              birthDate: dateOfBirth,
              emails: [
                {
                  type: 'primary',
                  email,
                },
              ],
              phones: [
                {
                  phone,
                  type: 'primary',
                },
              ],
            },
          });
        })
        .catch(err => {
          console.log(err.message);
          alert.onError(`${err.message} in detail`);
        });
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
    let newErrors: {
      [key: string]: {
        isEmpty: boolean;
        label: string;
      };
    } = { ...fieldErrors };

    Object.entries(fieldsToCheck).forEach(([key, value]) => {
      if (key === 'dateOfBirth') {
        const today = new Date();
        const diff = dayjs(today).diff(dayjs(value), 'years');
        if (diff < 21) {
          isError = true;
          return (newErrors[key].isEmpty = true);
        }
        return (newErrors[key].isEmpty = false);
      }

      if (key === 'phone') {
        if (value.length < 8) {
          isError = true;
          return (newErrors[key].isEmpty = true);
        }
        return (newErrors[key].isEmpty = false);
      }

      if (key === 'email') {
        if (!emailRegex.test(value)) {
          isError = true;
          return (newErrors[key].isEmpty = true);
        }
        return (newErrors[key].isEmpty = false);
      }
      if (key === 'toggleCheckBox') {
        if (!toggleCheckBox) {
          isError = true;
          return (newErrors.rules.isEmpty = true);
        }
        return (newErrors.rules.isEmpty = false);
      }

      if (isEmpty(value)) {
        isError = true;
        return (newErrors[key].isEmpty = true);
      }
      return (newErrors[key].isEmpty = false);
    });

    const emptyLabels = Object.values(newErrors)
      .filter((item: any) => item?.isEmpty)
      .map((item: any) => item?.label);

    if (emptyLabels.length > 0) {
      alert.onError(
        `${emptyLabels.join(', ')} certain fields are incomplete or invalid.`,
      );
    }

    setFieldErrors({ ...fieldErrors, ...newErrors });

    return !isError;
  };

  const onSave = () => {
    if (validationForm()) {
      register({
        variables: {
          username: phone,
          clientPortalId: ClIENTPORTAL_ID,
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
          <Membership isError={fieldErrors.membership?.isEmpty} />
          <Form
            fieldErrors={fieldErrors}
            toggleCheckBox={toggleCheckBox}
            setToggleCheckBox={setToggleCheckBox}
            onSave={onSave}
            loading={loading}
            customerLoading={customerLoading}
            detailLoading={detailLoading}
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
